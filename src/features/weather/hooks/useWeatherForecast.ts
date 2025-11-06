"use client";

import useSWR from "swr";
import { fetchWeatherForecast } from "@/features/weather/services/weatherForecastService";
import type { WeatherForecast } from "@/features/weather/types/weather";

export type UseWeatherForecastParams = {
  cityId: string | null;
};

/**
 * 天気予報データをSWRで取得・キャッシュするカスタムフック
 * @param params.cityId 取得対象の一次細分区域ID（nullの場合はフェッチしない）
 * @returns 天気予報データとSWRの状態値
 */
export function useWeatherForecast(params: UseWeatherForecastParams) {
  const swrResponse = useSWR<WeatherForecast, Error>(
    params.cityId,
    fetchWeatherForecast,
    {
      revalidateOnFocus: false,
    },
  );

  return swrResponse;
}
