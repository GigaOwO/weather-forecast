"use client";

import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ensureChartRegistration } from "@/features/weather/libs";
import type { Forecast } from "@/features/weather/types";

ensureChartRegistration();

export type TemperatureChartProps = {
  forecasts: Forecast[];
};

/**
 * 気温文字列を数値に変換する
 * @param value 気温文字列（nullの場合もある）
 * @returns 数値またはnull
 */
function parseTemperature(value: string | null): number | null {
  if (value === null) {
    return null;
  }

  const parsed = Number.parseFloat(value);

  if (Number.isNaN(parsed)) {
    return null;
  }

  return parsed;
}

/**
 * 予報データから日付ラベルを取得する
 * @param forecast 予報データ
 * @returns 日付ラベル
 */
function toLabel(forecast: Forecast): string {
  return forecast.dateLabel;
}

/**
 * 予報データから最高気温を取得する
 * @param forecast 予報データ
 * @returns 最高気温（数値またはnull）
 */
function toMaxTemperature(forecast: Forecast): number | null {
  return parseTemperature(forecast.temperature.max.celsius);
}

/**
 * 予報データから最低気温を取得する
 * @param forecast 予報データ
 * @returns 最低気温（数値またはnull）
 */
function toMinTemperature(forecast: Forecast): number | null {
  return parseTemperature(forecast.temperature.min.celsius);
}

type ChartPoint = {
  label: string;
  max: number | null;
  min: number | null;
};

/**
 * チャートポイントがチャートに含めるべきかを判定する
 * @param point チャートポイント
 * @returns 最高または最低気温が存在する場合true
 */
function shouldIncludeInChart(point: ChartPoint): boolean {
  return point.max !== null || point.min !== null;
}

/**
 * 予報データからチャート用のポイント配列を作成する
 * @param forecasts 予報データの配列
 * @returns チャートポイントの配列
 */
function createChartPoints(forecasts: Forecast[]): ChartPoint[] {
  const points: ChartPoint[] = [];

  for (const forecast of forecasts) {
    const point: ChartPoint = {
      label: toLabel(forecast),
      max: toMaxTemperature(forecast),
      min: toMinTemperature(forecast),
    };

    if (shouldIncludeInChart(point)) {
      points.push(point);
    }
  }

  return points;
}

/**
 * 気温推移チャートを表示するコンポーネント
 * @param props.forecasts 予報データの配列
 * @returns チャートのJSX
 */
export function TemperatureChart(props: TemperatureChartProps) {
  const points = createChartPoints(props.forecasts);
  const labels = points.map((point) => point.label);
  const maxTemperatures = points.map((point) => point.max);
  const minTemperatures = points.map((point) => point.min);

  const data = {
    labels,
    datasets: [
      {
        label: "最高気温 (℃)",
        data: maxTemperatures,
        borderColor: "#ef4444",
        backgroundColor: "#fca5a5",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "最低気温 (℃)",
        data: minTemperatures,
        borderColor: "#3b82f6",
        backgroundColor: "#93c5fd",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "気温の推移",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback(tickValue: string | number) {
            return `${tickValue}℃`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <Line options={options} data={data} />
    </div>
  );
}
