"use client";

import type { ChangeEvent } from "react";
import {
  CITY_GROUPS,
  type CityGroup,
  type CityOption,
} from "@/features/weather/constants/cities";

export type CitySelectorProps = {
  value: string;
  onChange: (cityId: string) => void;
};

function renderOption(city: CityOption) {
  return (
    <option key={city.id} value={city.id}>
      {city.label}
    </option>
  );
}

function renderGroup(group: CityGroup) {
  return (
    <optgroup key={group.label} label={group.label}>
      {group.cities.map(renderOption)}
    </optgroup>
  );
}

export function CitySelector(props: CitySelectorProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    props.onChange(event.target.value);
  }

  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-700">
      <span className="font-semibold text-zinc-900">地域を選択</span>
      <select
        className="rounded-md border border-zinc-300 px-3 py-2 text-base text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={props.value}
        onChange={handleChange}
      >
        {CITY_GROUPS.map(renderGroup)}
      </select>
    </label>
  );
}
