import { WEATHER_FORECAST_API_BASE_URL } from "@/features/weather/constants/api";
import {
  findCityGroupByCityId,
  findCityOptionById,
} from "@/features/weather/constants/cities";
import { fetchWeeklyForecast } from "@/features/weather/services/weeklyForecastService";
import {
  type Forecast,
  type WeatherForecast,
  weatherForecastSchema,
} from "@/features/weather/types/weather";
import {
  type WeeklyForecast,
  weeklyLongTermAreaSchema,
  weeklyShortTermAreaSchema,
} from "@/features/weather/types/weekly";

type WeeklyTemperature = {
  minCelsius: string | null;
  maxCelsius: string | null;
};

type WeeklyTemperatureTable = {
  shortTerm: WeeklyTemperature | null;
  shortTermDate: string | null;
  longTerm: Map<string, WeeklyTemperature>;
};

/**
 * 天気予報APIと気象庁の週間データを統合して予報を取得する非同期関数
 * @param cityId 全国の地点定義表に基づく一次細分区域ID
 * @returns Zodで検証済みの天気予報データ
 * @throws API呼び出しやZod検証に失敗した場合はエラーを投げる
 */
export async function fetchWeatherForecast(
  cityId: string,
): Promise<WeatherForecast> {
  const cityOption = findCityOptionById(cityId);

  if (cityOption === undefined || findCityGroupByCityId(cityId) === undefined) {
    throw new Error(
      "指定された地域IDに対応する都市情報が見つかりませんでした。",
    );
  }

  const dailyUrl = `${WEATHER_FORECAST_API_BASE_URL}?city=${cityId}`;

  const [dailyResponse, weeklyData] = await Promise.all([
    fetch(dailyUrl, { cache: "no-store" }),
    fetchWeeklyForecast(cityId),
  ]);

  if (!dailyResponse.ok) {
    throw new Error("天気予報APIの取得に失敗しました。");
  }

  const dailyJson = await dailyResponse.json();
  const dailyForecast = weatherForecastSchema.parse(dailyJson);

  const weeklyTable = buildWeeklyTemperatureTable(weeklyData, cityOption.label);
  const useWeeklyForTomorrow = shouldUseWeeklyTemperaturesForTomorrow();

  const mergedForecasts = dailyForecast.forecasts.map((forecast, index) => {
    return mergeTemperature({
      forecast,
      index,
      useWeeklyForTomorrow,
      weeklyTable,
    });
  });

  return {
    ...dailyForecast,
    forecasts: mergedForecasts,
  };
}

type MergeTemperatureOptions = {
  forecast: Forecast;
  index: number;
  useWeeklyForTomorrow: boolean;
  weeklyTable: WeeklyTemperatureTable;
};

function mergeTemperature(options: MergeTemperatureOptions): Forecast {
  const { forecast, index } = options;
  const baseMin = normalizeTemperatureString(forecast.temperature.min.celsius);
  const baseMax = normalizeTemperatureString(forecast.temperature.max.celsius);

  let finalMin = baseMin;
  let finalMax = baseMax;

  if (index === 1 && options.useWeeklyForTomorrow) {
    const weeklyTomorrow =
      (options.weeklyTable.shortTermDate === forecast.date
        ? options.weeklyTable.shortTerm
        : null) ??
      options.weeklyTable.longTerm.get(forecast.date) ??
      null;

    if (weeklyTomorrow !== null) {
      if (weeklyTomorrow.minCelsius !== null) {
        finalMin = weeklyTomorrow.minCelsius;
      }
      if (weeklyTomorrow.maxCelsius !== null) {
        finalMax = weeklyTomorrow.maxCelsius;
      }
    }
  }

  if (index === 2) {
    const weeklyDayAfter =
      options.weeklyTable.longTerm.get(forecast.date) ?? null;

    if (weeklyDayAfter !== null) {
      if (weeklyDayAfter.minCelsius !== null) {
        finalMin = weeklyDayAfter.minCelsius;
      }
      if (weeklyDayAfter.maxCelsius !== null) {
        finalMax = weeklyDayAfter.maxCelsius;
      }
    }
  }

  return {
    ...forecast,
    temperature: {
      min: {
        celsius: finalMin,
        fahrenheit: convertCelsiusToFahrenheit(finalMin),
      },
      max: {
        celsius: finalMax,
        fahrenheit: convertCelsiusToFahrenheit(finalMax),
      },
    },
  };
}

function buildWeeklyTemperatureTable(
  weeklyForecast: WeeklyForecast,
  cityLabel: string,
): WeeklyTemperatureTable {
  let shortTerm: WeeklyTemperature | null = null;
  let shortTermDate: string | null = null;
  const longTerm = new Map<string, WeeklyTemperature>();

  for (const section of weeklyForecast) {
    for (const series of section.timeSeries) {
      const timeDefines = Array.isArray(series.timeDefines)
        ? (series.timeDefines as string[])
        : [];

      const areas = Array.isArray(series.areas) ? series.areas : [];

      for (const rawArea of areas) {
        if (shortTerm === null) {
          const parsedShort = weeklyShortTermAreaSchema.safeParse(rawArea);
          if (parsedShort.success && parsedShort.data.area.name === cityLabel) {
            const min = normalizeTemperatureString(
              parsedShort.data.temps.at(0),
            );
            const max = normalizeTemperatureString(
              parsedShort.data.temps.at(1),
            );
            if (min !== null || max !== null) {
              const firstDate = timeDefines.at(0) ?? null;
              shortTermDate = firstDate === null ? null : extractDate(firstDate);
              shortTerm = {
                minCelsius: min,
                maxCelsius: max,
              };
            }
            continue;
          }
        }

        const parsedLong = weeklyLongTermAreaSchema.safeParse(rawArea);
        if (parsedLong.success && parsedLong.data.area.name === cityLabel) {
          timeDefines.forEach((timeDefine, index) => {
            const date = extractDate(timeDefine);
            if (date === "") {
              return;
            }

            const min = normalizeTemperatureString(
              parsedLong.data.tempsMin.at(index),
            );
            const max = normalizeTemperatureString(
              parsedLong.data.tempsMax.at(index),
            );

            if (min !== null || max !== null) {
              longTerm.set(date, {
                minCelsius: min,
                maxCelsius: max,
              });
            }
          });
        }
      }
    }
  }

  return {
    shortTerm,
    shortTermDate,
    longTerm,
  };
}

function normalizeTemperatureString(
  value: string | null | undefined,
): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  const trimmed = value.trim();

  if (trimmed === "" || trimmed === "--") {
    return null;
  }

  return trimmed;
}

function convertCelsiusToFahrenheit(celsius: string | null): string | null {
  if (celsius === null) {
    return null;
  }

  const numeric = Number.parseFloat(celsius);

  if (Number.isNaN(numeric)) {
    return null;
  }

  const fahrenheit = (numeric * 9) / 5 + 32;

  return fahrenheit.toFixed(1);
}

function extractDate(timeString: string): string {
  return timeString.slice(0, 10);
}

function shouldUseWeeklyTemperaturesForTomorrow(): boolean {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const hourPart = parts.find((part) => part.type === "hour");

  if (hourPart === undefined) {
    return false;
  }

  const hour = Number.parseInt(hourPart.value, 10);

  return Number.isNaN(hour) ? false : hour <= 5;
}
