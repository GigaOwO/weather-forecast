"use client";

import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import {
  CITY_GROUPS,
  type CityGroup,
  type CityOption,
} from "@/features/weather/constants";

export type CitySelectorProps = {
  value: string;
};

/**
 * 都市オプションを描画する
 * @param city 都市オプション
 * @returns optionエレメント
 */
function renderOption(city: CityOption) {
  return (
    <option key={city.id} value={city.id}>
      {city.label}
    </option>
  );
}

/**
 * 都市グループを描画する
 * @param group 都市グループ
 * @returns optgroupエレメント
 */
function renderGroup(group: CityGroup) {
  return (
    <optgroup key={group.label} label={group.label}>
      {group.cities.map(renderOption)}
    </optgroup>
  );
}

/**
 * 都市選択コンポーネント
 * @param props.value 選択中の都市ID
 */
export function CitySelector({ value }: CitySelectorProps) {
  const router = useRouter();

  /**
   * 選択変更時のハンドラ
   * @param event 変更イベント
   */
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const cityId = event.target.value;
    router.push(`/?city=${cityId}`);
  }

  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">地域を選択</span>
      <select
        className="rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={handleChange}
      >
        {CITY_GROUPS.map(renderGroup)}
      </select>
    </label>
  );
}
