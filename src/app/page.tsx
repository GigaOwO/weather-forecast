import { Suspense } from "react";
import { CitySelector, WeatherDisplay } from "@/features/weather/components";
import { DEFAULT_CITY_ID } from "@/features/weather/constants";

type PageProps = {
  searchParams: Promise<{ city?: string }>;
};

/**
 * ページコンテンツを表示する内部コンポーネント
 */
async function PageContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const cityId = params.city ?? DEFAULT_CITY_ID;

  return (
    <section className="space-y-6">
      <CitySelector value={cityId} />
      <WeatherDisplay key={cityId} cityId={cityId} />
    </section>
  );
}

/**
 * ローディングスケルトン
 */
function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="h-5 w-24 rounded bg-zinc-200 animate-pulse" />
        <div className="h-10 w-full rounded bg-zinc-200 animate-pulse" />
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-1/3 rounded bg-zinc-200" />
        <div className="h-32 rounded bg-zinc-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-48 rounded bg-zinc-200" />
          <div className="h-48 rounded bg-zinc-200" />
          <div className="h-48 rounded bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

export default function Home({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 via-white to-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Weather Intelligence
          </p>
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            グラフで見る天気予報ダッシュボード
          </h1>
          <p className="max-w-3xl text-base text-zinc-600">
            全国の主要都市に対応した天気予報APIを利用し、気温の推移や降水確率などを
            わかりやすく可視化しています。都市を切り替えて最新の予報を確認しましょう。
          </p>
        </header>
        <Suspense fallback={<PageSkeleton />}>
          <PageContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
