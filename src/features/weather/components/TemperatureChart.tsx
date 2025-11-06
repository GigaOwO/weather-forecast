"use client";

import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { ensureChartRegistration } from "@/features/weather/libs/chart";
import type { Forecast } from "@/features/weather/types/weather";

ensureChartRegistration();

export type TemperatureChartProps = {
  forecasts: Forecast[];
};

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

function toLabel(forecast: Forecast): string {
  return forecast.dateLabel;
}

function toMaxTemperature(forecast: Forecast): number | null {
  return parseTemperature(forecast.temperature.max.celsius);
}

function toMinTemperature(forecast: Forecast): number | null {
  return parseTemperature(forecast.temperature.min.celsius);
}

type ChartPoint = {
  label: string;
  max: number | null;
  min: number | null;
};

function shouldIncludeInChart(point: ChartPoint): boolean {
  return point.max !== null || point.min !== null;
}

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
