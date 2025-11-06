"use client";

import { useState } from "react";
import { CitySelector } from "@/features/weather/components/CitySelector";
import { ForecastList } from "@/features/weather/components/ForecastList";
import { TemperatureChart } from "@/features/weather/components/TemperatureChart";
import {
  DEFAULT_CITY_ID,
  findCityGroupByCityId,
  findCityOptionById,
} from "@/features/weather/constants/cities";
import { useWeatherForecast } from "@/features/weather/hooks/useWeatherForecast";

function findCityLabel(cityId: string): string {
  const group = findCityGroupByCityId(cityId);
  const city = findCityOptionById(cityId);

  if (group !== undefined && city !== undefined) {
    return `${group.label} ${city.label}`;
  }

  return "不明な地域";
}

export function WeatherForecastSection() {
  const [cityId, setCityId] = useState<string>(DEFAULT_CITY_ID);

  const { data, error, isLoading } = useWeatherForecast({
    cityId,
  });

  function handleCityChange(nextCityId: string): void {
    setCityId(nextCityId);
  }

  if (error !== undefined) {
    return (
      <section className="space-y-6">
        <CitySelector value={cityId} onChange={handleCityChange} />
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          データの取得に失敗しました。時間を置いて再度お試しください。
        </p>
      </section>
    );
  }

  if (data === undefined || isLoading) {
    return (
      <section className="space-y-6">
        <CitySelector value={cityId} onChange={handleCityChange} />
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-1/3 rounded bg-zinc-200" />
          <div className="h-32 rounded bg-zinc-200" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-48 rounded bg-zinc-200" />
            <div className="h-48 rounded bg-zinc-200" />
            <div className="h-48 rounded bg-zinc-200" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <CitySelector value={cityId} onChange={handleCityChange} />
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
    </section>
  );
}
