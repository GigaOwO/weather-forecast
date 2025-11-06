import { WeatherForecastSection } from "@/features/weather/components/WeatherForecastSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
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
        <WeatherForecastSection />
      </div>
    </main>
  );
}
