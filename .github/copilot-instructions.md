# 🚀 AGENT.md

このドキュメントは、本プロジェクトの**開発ルール・設計方針・運用規約**を統一するための指南書です。
すべてのメンバーはこの内容に従って開発を行ってください。

---

## ✅ 使用技術・基本ルール

| 項目 | 内容 |
|------|------|
| 言語 | TypeScript |
| フレームワーク | Next.js（**Turbopack** 使用必須） |
| パッケージマネージャ | npm |
| UI | shadcn/ui, Lucide Icons(任意) |
| バリデーション | Zod |
| 型安全 | **any禁止 / as禁止 / Zodで型ガード・型推論** |
| 環境変数 | 機密情報は `NEXT_PUBLIC_` 使用禁止 → **Server Component / Route Handler / Server Actions** で `process.env` を使用。クライアント側で必要な公開情報のみ `NEXT_PUBLIC_` 使用可(Analytics ID等) |
| 関数定義 | `const fn = () => {}` ではなく **function宣言を優先** |
| 副作用 | **データフェッチにuseEffectを使用しない** → Server Component / Route Handlerでデータ取得。Client Componentでのライフサイクル管理やブラウザAPIアクセスには適切に使用 |
| コメント | 全ての hooks / services / utils / API に **JSDoc を記述** |
| Linter / Formatter | **ESLint + Prettier** |
| テスト | **Jest + React Testing Library** |
| Git戦略 | Git-Flow（masterへ直接push禁止） |
| Git Hooks | **husky + lint-staged** |
| CI | GitHub Actionsで **lint + test 自動実行** |
| MCP Server | **Next.js MCP Server + GitHub MCP Server を必ず使用** |
| 共有言語 | 会話・ドキュメント・コードコメントは **日本語** |

---

## 📁 ディレクトリ構成（Feature-Based Architecture）

    src/
    ├── features/
    │   ├── example/
    │   │   ├── components/
    │   │   │   ├── ExampleComponent.tsx
    │   │   │   └── index.ts      // componentsのexportをまとめる
    │   │   ├── hooks/
    │   │   │   ├── useExample.ts
    │   │   │   └── index.ts      // hooksのexportをまとめる
    │   │   ├── services/
    │   │   │   ├── exampleService.ts
    │   │   │   └── index.ts      // servicesのexportをまとめる
    │   │   ├── libs/
    │   │   │   └── index.ts
    │   │   ├── utils/
    │   │   │   └── index.ts
    │   │   ├── types/
    │   │   │   ├── example.ts
    │   │   │   └── index.ts      // typesのexportをまとめる
    │   │   ├── constants/
    │   │   │   └── index.ts
    │   │   └── config/
    │   │       └── index.ts
    ├── app/
    │   ├── api/
    │   │   └── example/route.ts  // 環境変数 + API処理
    └── shared/                   // 共通UI・hooksなど

**重要:** 各サブフォルダ（components、hooks、services等）には必ず `index.ts` を作成し、そのフォルダ内のファイルをexportすること。

**各フォルダの index.ts 例:**
```typescript
// features/example/components/index.ts
export * from './ExampleComponent';
export * from './AnotherComponent';

// features/example/hooks/index.ts
export * from './useExample';
export * from './useAnotherHook';

// features/example/services/index.ts
export * from './exampleService';
export * from './anotherService';

// features/example/types/index.ts
export * from './example';
export * from './another';
```

**使用例:**
```typescript
// 各フォルダのindex.tsを経由してインポート
import { ExampleComponent } from '@/features/example/components';
import { useExample } from '@/features/example/hooks';
import { fetchExampleData } from '@/features/example/services';
import { ExampleType } from '@/features/example/types';
```

---

## ✅ 環境変数運用ルール

### 基本原則
- **機密情報**(API Key, Database URL等)は `NEXT_PUBLIC_` 使用禁止
- **公開情報**(Analytics ID, Public API Endpoint等)のみ `NEXT_PUBLIC_` 使用可
- `.env` は `.gitignore` に含めコミット禁止
- `.env.example` を必ず用意し、必要なキーのみ記載する

    # 機密情報(サーバー側のみ)
    SECRET_API_KEY=
    DATABASE_URL=
    NEXTAUTH_SECRET=
    
    # 公開情報(クライアント側で使用可能)
    NEXT_PUBLIC_ANALYTICS_ID=
    NEXT_PUBLIC_API_BASE_URL=

### サーバー側での使用例:

    // app/api/example/route.ts
    import { NextResponse } from 'next/server';
    
    export async function GET() {
      // サーバー側で機密情報を使用
      const apiKey = process.env.SECRET_API_KEY;
      return NextResponse.json({ apiKey });
    }

### クライアント側での使用例(公開情報のみ):

    // app/components/Analytics.tsx
    'use client';
    
    export function Analytics() {
      // 公開情報はクライアントで使用可能
      const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
      return <script data-id={analyticsId} />;
    }

---

## ✅ useEffectの適切な使用

### ❌ useEffectを避けるべきケース

| ❌ NG | ✅ OK |
|------|------|
| useEffectでデータフェッチ | Server Component / Route Handlerでfetch |
| useEffectで環境変数を参照 | サーバー側で取得しprops渡し |
| マウント時のデータ取得 | Server Actions / Direct Async Function |

### ✅ useEffectを使用すべきケース

Client Componentで以下が必要な場合は**useEffectを適切に使用**:

- **ブラウザAPI**: `window`, `localStorage`, `Navigator.geolocation` 等
- **イベントリスナー**: `addEventListener`, `removeEventListener`
- **ライフサイクル管理**: コンポーネントのマウント/アンマウント時処理
- **外部ライブラリの初期化**: チャート、マップ等のライブラリ

**使用例:**
```typescript
'use client';

export function Component() {
  useEffect(() => {
    // ✅ ブラウザAPIの使用
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}
```

---

## ✅ 関数宣言ルール（Arrow禁止・function使用）

    // ✅ 正しい
    export function getUser() {
      return 'John';
    }
    
    // ❌ 避ける
    export const getUser = () => {
      return 'John';
    };

**理由**
- スタックトレースで名前が見える
- hoistingされる → 読みやすい
- チーム開発でバグ調査が容易

---

## ✅ type / interface の使い分け

| 目的 | type | interface |
|------|------|-----------|
| 基本的な型定義 | ✅ | ✅ |
| ユニオン型・交差型 | ✅ | ❌ |
| Zodで生成する型 | ✅ | ❌ |
| ライブラリ型拡張・宣言マージ | ❌ | ✅ |
| ReactのProps | ✅ | ✅ |

**方針**
- 基本：`type` を使用
- 拡張・再宣言が必要な場合のみ `interface`

---

## ✅ tsconfigパスエイリアス設定

    {
      "compilerOptions": {
        "baseUrl": "src",
        "paths": {
          "@/*": ["./*"]
        }
      }
    }

使用例：

    import { Button } from "@/shared/components/Button";

---

## ✅ JSDoc書き方

    /**
     * ユーザー情報を取得するService関数
     * @param userId ユーザーID(UUID形式)
     * @returns ユーザー情報（User型）
     */
    export async function fetchUser(userId: string): Promise<User> {
      const res = await fetch(`/api/user/${userId}`);
      return res.json();
    }

---
## ✅ デザイン・フォントガイド

### 🎨 フォントルール

| 対象 | 使用フォント |
|------|--------------|
| 日本語 | **Noto Sans JP** |
| 英語 / 数字 | **Inter** |

## ✅ GitHub Actions（CI）

    name: CI
    
    on:
      push:
        branches: [develop, feature/*]
      pull_request:
        branches: [develop]
    
    jobs:
      lint-and-test:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-node@v3
            with:
              node-version: 22
              cache: 'npm'
          - run: npm install
          - run: npm run lint
          - run: npm test

---

## ✅ Pull Request テンプレート（推奨）

    ## ✅ 概要
    
    ## ✅ 変更内容
    - [ ]
    
    ## ✅ 動作確認
    - [ ] npm run build
    - [ ] npm run lint
    - [ ] npm test
    
    ## ✅ 関連Issue
    close #

---

## ✅ Git-Flow ブランチ戦略

| ブランチ | 用途 |
|----------|------|
| master | 本番用（直接push禁止） |
| develop | 開発メイン |
| feature/** | 機能開発 |
| release/** | リリース準備 |
| hotfix/** | 本番緊急修正 |

---

## ✅ Turbopackについて

- `next dev` 実行時にTurbopackが自動で使用される(Next.js 13+)  
- 明示したい場合:`next dev --turbo`  
- webpack設定は基本使用しない  
- カスタマイズは `next.config.ts` の `turbopack` フィールドで行う

**設定例:**
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
```

---

## ✅ Server-Only / Client-Only パッケージ

セキュリティと型安全性を向上させるため、以下のパッケージを活用する:

| パッケージ | 用途 | インストール |
|-----------|------|-------------|
| `server-only` | サーバー専用コード保護(API Key漏洩防止) | `npm install server-only` |
| `client-only` | クライアント専用コード保護(window等) | `npm install client-only` |

### server-only の使用例:

```typescript
// lib/data.ts
import 'server-only';

export async function getData() {
  // 機密情報を含むサーバー専用ロジック
  const apiKey = process.env.SECRET_API_KEY;
  const res = await fetch('https://api.example.com/data', {
    headers: { authorization: apiKey },
  });
  return res.json();
}
```

- Client Componentでインポートすると**ビルドエラー**
- 機密情報の誤ったクライアント露出を防止

### client-only の使用例:

```typescript
// lib/browser-utils.ts
import 'client-only';

export function getLocalStorage(key: string) {
  // ブラウザ専用ロジック
  return window.localStorage.getItem(key);
}
```

---

## ✅ Suspense + Streaming パターン

パフォーマンス向上のため、Suspenseとストリーミングを活用する:

| 方法 | 用途 | スコープ |
|------|------|---------|
| `loading.js` | ページ全体のローディング状態 | ルートセグメント全体 |
| `<Suspense>` | 粒度の細かいストリーミング | コンポーネント単位 |

### loading.js の使用:

```typescript
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### Suspense の使用(推奨):

```typescript
// app/blog/page.tsx
import { Suspense } from 'react';
import BlogList from './BlogList';
import Skeleton from './Skeleton';

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      {/* 即座に表示される */}
      <Suspense fallback={<Skeleton />}>
        {/* データ取得中はSkeletonを表示 */}
        <BlogList />
      </Suspense>
    </div>
  );
}
```

**メリット:**
- 初期表示が高速化
- ユーザー体験の向上
- SEO対策(HTMLが段階的に送信される)

---

## ✅ データフェッチパターン

### Parallel(並列)データフェッチ

**独立したリクエストは並列で実行**してパフォーマンスを最適化:

```typescript
// ❌ 避ける(Sequential - 遅い)
export default async function Page() {
  const artist = await getArtist();  // 1秒待機
  const albums = await getAlbums();  // 1秒待機
  // 合計2秒
}

// ✅ 推奨(Parallel - 速い)
export default async function Page() {
  const [artist, albums] = await Promise.all([
    getArtist(),  // 並列実行
    getAlbums(),  // 並列実行
  ]);
  // 合計1秒
}
```

### Sequential(順次)データフェッチ

**依存関係がある場合のみ順次実行**:

```typescript
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. まずアーティスト情報を取得
  const artist = await getArtist(id);
  
  // 2. アーティストIDを使ってプレイリストを取得(依存関係あり)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Playlists artistID={artist.id} />
    </Suspense>
  );
}
```

---

## ✅ キャッシュ戦略

Next.jsの3つのキャッシュ機構を理解し、適切に使用する:

| 手法 | スコープ | 用途 | 使用方法 |
|------|---------|------|---------|
| Request Memoization | 単一レンダーパス | 同一リクエストの重複排除 | 自動(fetch使用時) |
| Data Cache | 複数リクエスト | 永続的なキャッシュ | `cache: 'force-cache'` |
| React cache | ORM/DB | 非fetch関数のメモ化 | `cache()` 関数 |

### Request Memoization(自動):

```typescript
// 同じURLとoptionsのfetchは自動的に1回のみ実行される
async function Component1() {
  const data = await fetch('https://api.example.com/data');
}

async function Component2() {
  const data = await fetch('https://api.example.com/data'); // キャッシュから取得
}
```

### Data Cache:

```typescript
// デフォルトでキャッシュされる
const data = await fetch('https://api.example.com/data');

// キャッシュを無効化
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// 一定時間後に再検証
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1時間
});
```

### React cache(ORM/DB用):

```typescript
// lib/data.ts
import { cache } from 'react';
import 'server-only';
import { db, posts, eq } from '@/lib/db';

export const getPost = cache(async (id: string) => {
  // 同じIDでの複数回呼び出しは1回のDB問い合わせのみ
  return await db.query.posts.findFirst({
    where: eq(posts.id, parseInt(id)),
  });
});
```

**使用例:**
```typescript
// 複数箇所で呼び出してもDB問い合わせは1回のみ
const post1 = await getPost('1');
const post2 = await getPost('1'); // キャッシュから取得
```

---

## 🔥 今後の拡張候補（必要時に導入すること）

| 項目 | 内容 |
|------|------|
| Storybook | UIカタログ化・デザイン共有 |
| commitlint | コミット規約（Conventional Commits）自動チェック |
| APIエラーハンドリング | Result型 / Error Boundary / try-catchの共通化 |
| Sentry / LogRocket | 本番環境のログ監視・エラー追跡 |
| i18n対応 | next-intl / next-i18next |
| Performance測定 | React Profiler / Lighthouse |
| デザインシステム強化 | Tailwindのdesign tokens化 / global style管理 |

---

## ✅ ToDo（初期セットアップ時に行うこと）

- [ ] features/ ディレクトリ作成  
- [ ] 各サブフォルダ（components、hooks、services等）に `index.ts` を作成し、そのフォルダ内のファイルをexport
- [ ] `.env.example` 作成  
- [ ] `tsconfig.json` に `@/*` パスエイリアス設定  
- [ ] Zod / ESLint / Prettier / Turbopack が正常動作する状態にする
- [ ] Jest + React Testing Library のセットアップ
- [ ] husky + lint-staged のセットアップ
- [ ] 初回commit → `chore: initialize project`  
- [ ] 必要に応じて Storybook / commitlint を導入する  

---