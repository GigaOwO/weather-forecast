import { cache } from "react";
import "server-only";
import { getWeeklyForecastAreaCode } from "@/features/weather/constants";
import {
  type WeeklyForecast,
  weeklyForecastSchema,
} from "@/features/weather/types";

/**
 * 気象庁が公開する週間・短期予報データを取得する非同期関数
 * @param cityId livedoor互換の一次細分区域ID
 * @returns 週間予報の生データ(Zod検証済み)
 */
export const fetchWeeklyForecast = cache(
  async (cityId: string): Promise<WeeklyForecast> => {
    const areaCode = getWeeklyForecastAreaCode(cityId);
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!response.ok) {
      throw new Error("週間天気予報の取得に失敗しました。");
    }

    const json = await response.json();

    return weeklyForecastSchema.parse(json);
  },
);
