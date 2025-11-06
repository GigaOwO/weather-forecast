import { z } from "zod";

const weeklyAreaBaseSchema = z
  .object({
    area: z.object({
      name: z.string(),
      code: z.string(),
    }),
  })
  .passthrough();

export const weeklyShortTermAreaSchema = weeklyAreaBaseSchema.extend({
  temps: z.array(z.string()),
});

export const weeklyLongTermAreaSchema = weeklyAreaBaseSchema.extend({
  tempsMin: z.array(z.string()),
  tempsMax: z.array(z.string()),
  tempsMinUpper: z.array(z.string()).optional(),
  tempsMinLower: z.array(z.string()).optional(),
  tempsMaxUpper: z.array(z.string()).optional(),
  tempsMaxLower: z.array(z.string()).optional(),
});

const weeklyTimeSeriesSchema = z
  .object({
    timeDefines: z.array(z.string()),
    areas: z.array(z.record(z.string(), z.any())),
  })
  .passthrough();

export const weeklyForecastSchema = z.array(
  z
    .object({
      publishingOffice: z.string(),
      reportDatetime: z.string(),
      timeSeries: z.array(weeklyTimeSeriesSchema),
    })
    .passthrough(),
);

export type WeeklyForecast = z.infer<typeof weeklyForecastSchema>;
export type WeeklyShortTermArea = z.infer<typeof weeklyShortTermAreaSchema>;
export type WeeklyLongTermArea = z.infer<typeof weeklyLongTermAreaSchema>;
