import type { FuelType } from '@/types';

export interface StationSeed {
  id: string;
  name: string;
  brand: string;
  address: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  prices: Record<FuelType, number>;
  ratingAvg?: number;
  is24Hours?: boolean;
}

const BASE: Record<FuelType, number> = {
  AI_92: 10420,
  AI_95: 11120,
  DIESEL: 9720,
  GAS: 4080,
};

/** Tez AZS qo'shish — viloyat bo'ylab kichik shaharlar */
export function azs(
  id: string,
  name: string,
  brand: string,
  city: string,
  region: string,
  address: string,
  latitude: number,
  longitude: number,
  priceOffset = 0,
): StationSeed {
  return {
    id,
    name,
    brand,
    city,
    region,
    address,
    latitude,
    longitude,
    prices: {
      AI_92: BASE.AI_92 + priceOffset,
      AI_95: BASE.AI_95 + priceOffset,
      DIESEL: BASE.DIESEL + priceOffset,
      GAS: BASE.GAS + Math.round(priceOffset / 2),
    },
  };
}
