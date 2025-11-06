import { z } from "zod";

const temperatureSchema = z.object({
  celsius: z.string().nullable(),
  fahrenheit: z.string().nullable(),
});

const chanceOfRainSchema = z.object({
  T00_06: z.string(),
  T06_12: z.string(),
  T12_18: z.string(),
  T18_24: z.string(),
});

const forecastImageSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const forecastDetailSchema = z.object({
  weather: z.string().nullable(),
  wind: z.string().nullable(),
  wave: z.string().nullable(),
});

const forecastSchema = z.object({
  date: z.string(),
  dateLabel: z.string(),
  telop: z.string(),
  detail: forecastDetailSchema,
  temperature: z.object({
    min: temperatureSchema,
    max: temperatureSchema,
  }),
  chanceOfRain: chanceOfRainSchema,
  image: forecastImageSchema,
});

const descriptionSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  headlineText: z.string(),
  bodyText: z.string(),
  text: z.string(),
});

const locationSchema = z.object({
  area: z.string(),
  prefecture: z.string(),
  district: z.string(),
  city: z.string(),
});

const providerSchema = z.object({
  link: z.string().url(),
  name: z.string(),
  note: z.string().nullable().optional(),
});

const copyrightImageSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const copyrightSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  image: copyrightImageSchema,
  provider: z.array(providerSchema),
});

export const weatherForecastSchema = z.object({
  publicTime: z.string(),
  publicTimeFormatted: z.string(),
  publishingOffice: z.string(),
  title: z.string(),
  link: z.string().url(),
  description: descriptionSchema,
  forecasts: z.array(forecastSchema),
  location: locationSchema,
  copyright: copyrightSchema,
});

export type WeatherForecast = z.infer<typeof weatherForecastSchema>;
export type Forecast = z.infer<typeof forecastSchema>;
