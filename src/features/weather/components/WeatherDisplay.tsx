import { Suspense } from "react";
import { ForecastList, TemperatureChart } from "@/features/weather/components";
import {
  findCityGroupByCityId,
  findCityOptionById,
} from "@/features/weather/constants";
import { fetchWeatherForecast } from "@/features/weather/services";

type WeatherDisplayProps = {
  cityId: string;
};

/**
 * 都市名を見つける補助関数
 * @param cityId 都市ID
 * @returns 都市ラベル
 */
function findCityLabel(cityId: string): string {
  const group = findCityGroupByCityId(cityId);
  const city = findCityOptionById(cityId);

  if (group !== undefined && city !== undefined) {
    return `${group.label} ${city.label}`;
  }

  return "不明な地域";
}

/**
 * 天気予報データを取得・表示するServer Component
 * @param props.cityId 都市ID
 */
async function WeatherContent({ cityId }: WeatherDisplayProps) {
  const data = await fetchWeatherForecast(cityId);

  return (
    <>
      <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <header className="space-y-2">
          <p className="text-sm font-medium text-blue-600">
            {data.publishingOffice}
          </p>
          <h2 className="text-2xl font-bold text-zinc-900">
            {findCityLabel(cityId)}の天気
          </h2>
          <p className="text-sm text-zinc-500">
            発表: {new Date(data.publicTime).toLocaleString("ja-JP")}
          </p>
        </header>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
          {data.description.text}
        </p>
      </article>
      <TemperatureChart forecasts={data.forecasts} />
      <ForecastList forecasts={data.forecasts} />
    </>
  );
}

/**
 * ローディング用のスケルトンUI
 */
function WeatherSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-1/3 rounded bg-zinc-200" />
      <div className="h-32 rounded bg-zinc-200" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-48 rounded bg-zinc-200" />
        <div className="h-48 rounded bg-zinc-200" />
        <div className="h-48 rounded bg-zinc-200" />
      </div>
    </div>
  );
}

/**
 * 天気予報を表示するコンポーネント（Suspense境界を含む）
 * @param props.cityId 都市ID
 */
export function WeatherDisplay({ cityId }: WeatherDisplayProps) {
  return (
    <Suspense fallback={<WeatherSkeleton />}>
      <WeatherContent cityId={cityId} />
    </Suspense>
  );
}
