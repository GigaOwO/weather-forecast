# 天気予報ダッシュボード

リアルタイムの天気予報APIと気象庁が公開する週間予報データを組み合わせ、選択した地域の予報をグラフ付きで閲覧できる Next.js アプリケーションです。React の `cache` によるデータメモ化と `react-chartjs-2` によるビジュアライズで、最新の気象情報を直感的に確認できます。

## 主な機能

- livedoor 互換の天気予報APIからの当日〜明後日の予報取得
- 気象庁配信データを利用した明日・明後日の気温補完ロジック
- 地域選択コンボボックス（全国の一次細分区域に対応）
- 最高 / 最低気温のラインチャート表示
- 降水確率や詳細情報を含むカードレイアウト

## 使用技術

- Next.js 16 (App Router, Server Components, React cache)
- TypeScript / Zod
- Chart.js + react-chartjs-2
- Biome (Lint / Format)
- Noto Sans JP（`next/font` 経由で配信）

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで <http://localhost:3000> を開くとアプリケーションを確認できます。

### テスト / Lint

```bash
npm run lint
```

## ディレクトリ構成

```
src/
├── app/                     # App Router エントリポイント
├── features/
│   └── weather/             # 天気予報機能（Feature Based）
│       ├── components/      # UI コンポーネント
│       ├── constants/       # 定数・マスタデータ
│       ├── hooks/           # カスタムフック（将来使用）
│       ├── services/        # API アクセス・データ整形
│       ├── types/           # Zod スキーマと型定義
│       └── libs/            # ライブラリ初期化（Chart.js など）
└── shared/                  # 共通コンポーネント（導入予定）
```

## 環境変数

デフォルトでは環境変数は不要ですが、必要に応じて `.env` を作成し、`.env.example` を参考に設定してください。`NEXT_PUBLIC_` プレフィックスは使用しません。

## データソース

- 天気予報 API（livedoor 互換）: <https://weather.tsukumijima.net/>
- 気象庁 週間天気予報 JSON: <https://www.jma.go.jp/bosai/>

## ライセンス

このリポジトリは学習・検証目的で利用することを想定しています。外部 API の利用規約に従い、適切にデータを扱ってください。
