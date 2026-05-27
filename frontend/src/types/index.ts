export type FuelType = 'AI_92' | 'AI_95' | 'DIESEL' | 'GAS';

export interface FuelPrice {
  id: string;
  fuelType: FuelType;
  pricePerLiter: number;
  currency: string;
  isAvailable: boolean;
}

export interface Station {
  id: string;
  name: string;
  brand?: string;
  address: string;
  latitude: number;
  longitude: number;
  status: string;
  ratingAvg: number;
  ratingCount: number;
  is24Hours: boolean;
  fuelPrices?: FuelPrice[];
  distanceKm?: number;
  travelTimeMin?: number;
}

export interface CheapestResult {
  station: Omit<Station, 'fuelPrices'>;
  price: { fuelType: FuelType; pricePerLiter: number; currency: string };
  distanceKm: number;
  travelTimeMin: number;
}

export interface Recommendation {
  recommended: {
    stationId: string;
    stationName: string;
    address: string;
    pricePerLiter: number;
    currency: string;
    distanceKm: number;
    travelTimeMin: number;
  };
  baseline: { stationName: string; pricePerLiter: number; distanceKm: number };
  savingsUzs: number;
  extraDistanceKm: number;
  message: string;
  score: number;
  alternatives: Array<{
    stationName: string;
    pricePerLiter: number;
    distanceKm: number;
    savingsUzs: number;
    score: number;
  }>;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export const FUEL_LABELS: Record<FuelType, string> = {
  AI_92: 'AI-92',
  AI_95: 'AI-95',
  DIESEL: 'Diesel',
  GAS: 'Gas',
};
