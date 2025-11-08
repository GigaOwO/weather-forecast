import Image from "next/image";
import type { Forecast } from "@/features/weather/types";

export type ForecastListProps = {
  forecasts: Forecast[];
};

type ChanceEntry = [string, string];

/**
 * 降水確率オブジェクトをエントリー配列に変換する
 * @param chance 降水確率オブジェクト
 * @returns エントリー配列
 */
function toChanceEntries(chance: Record<string, string>): ChanceEntry[] {
  return Object.entries(chance);
}

/**
 * 降水確率の単一アイテムを描画する
 * @param entry 時間帯と確率のエントリー
 * @returns 降水確率アイテムのJSX
 */
function renderChanceOfRainItem(entry: ChanceEntry) {
  const [timeRange, value] = entry;

  return (
    <div key={timeRange} className="flex items-center justify-between text-sm">
      <span className="text-zinc-500">{timeRange.replace("T", "")}</span>
      <span className="font-medium text-zinc-900">{value}</span>
    </div>
  );
}

/**
 * 降水確率リストを描画する
 * @param chance 降水確率オブジェクト
 * @returns 降水確率リストのJSX配列
 */
function renderChanceOfRain(chance: Record<string, string>) {
  return toChanceEntries(chance).map(renderChanceOfRainItem);
}

/**
 * 予報カードを描画する
 * @param forecast 予報データ
 * @returns 予報カードのJSX
 */
function renderForecastCard(forecast: Forecast) {
  return (
    <li
      key={forecast.date}
      className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-500">
            {forecast.dateLabel}
          </p>
          <p className="text-lg font-bold text-zinc-900">{forecast.telop}</p>
        </div>
        <Image
          src={forecast.image.url}
          alt={forecast.image.title}
          width={forecast.image.width}
          height={forecast.image.height}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
        <div>
          <p className="font-semibold text-zinc-900">詳細</p>
          <p>{forecast.detail.weather ?? "情報なし"}</p>
          <p>風: {forecast.detail.wind ?? "情報なし"}</p>
          <p>波: {forecast.detail.wave ?? "情報なし"}</p>
        </div>
        <div>
          <p className="font-semibold text-zinc-900">気温(℃)</p>
          <p>最高: {forecast.temperature.max.celsius ?? "--"}</p>
          <p>最低: {forecast.temperature.min.celsius ?? "--"}</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-900">降水確率</p>
        <div className="grid grid-cols-2 gap-2">
          {renderChanceOfRain(forecast.chanceOfRain)}
        </div>
      </div>
    </li>
  );
}

/**
 * 天気予報リストを表示するコンポーネント
 * @param props.forecasts 予報データの配列
 * @returns 予報リストのJSX
 */
export function ForecastList(props: ForecastListProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {props.forecasts.map(renderForecastCard)}
    </ul>
  );
}
