import type { FuelType, Station, Recommendation } from '@/types';
import { FUEL_LABELS } from '@/types';
import {
  uzbekistanStationSeeds,
  seedToStation,
} from '@/data/uzbekistanStations';
import type { Transaction, MarketTrend } from '@/data/mock';

const TANK_LITERS = 40;

export interface DashboardStats {
  totalSavingsUzs: number;
  totalLiters: number;
  timeSavedHours: number;
  ecoScore: number;
  avgPricePerLiter: number;
  stationsCount: number;
  cheapestStationName: string;
  monthOverMonthPercent: number;
}

export interface InsightData {
  recommendation: Recommendation | { message: string } | null;
  topStations: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    distanceKm: number;
    rating: number;
    city: string;
  }>;
  routeSavingHours: number;
  suggestedRoute: string;
}

export interface DeliveryQuote {
  vehicle: { name: string; plate: string };
  fuelTypes: FuelType[];
  pricePerLiter: number;
  breakdown: {
    fuelCost: number;
    deliveryFee: number;
    serviceFee: number;
    total: number;
  };
}

function getStationsForUser(lat: number, lng: number, region = 'Barchasi'): Station[] {
  const seeds =
    region === 'Barchasi'
      ? uzbekistanStationSeeds
      : uzbekistanStationSeeds.filter((s) => s.region === region);
  return seeds
    .map((s) => seedToStation(s, lat, lng))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

function getPrice(station: Station, fuel: FuelType): number | null {
  const p = station.fuelPrices?.find((f) => f.fuelType === fuel && f.isAvailable);
  return p?.pricePerLiter ?? null;
}

export function computeDashboardStats(
  lat: number,
  lng: number,
  fuel: FuelType,
): DashboardStats {
  const stations = getStationsForUser(lat, lng);
  const withPrices = stations
    .map((s) => ({ s, price: getPrice(s, fuel) }))
    .filter((x): x is { s: Station; price: number } => x.price != null);

  if (!withPrices.length) {
    return {
      totalSavingsUzs: 0,
      totalLiters: 0,
      timeSavedHours: 0,
      ecoScore: 0,
      avgPricePerLiter: 0,
      stationsCount: stations.length,
      cheapestStationName: '—',
      monthOverMonthPercent: 0,
    };
  }

  const sortedByPrice = [...withPrices].sort((a, b) => a.price - b.price);
  const sortedByDist = [...withPrices].sort(
    (a, b) => (a.s.distanceKm ?? 0) - (b.s.distanceKm ?? 0),
  );

  const nearest = sortedByDist[0];
  const cheapest = sortedByPrice[0];
  const baselinePrice = nearest.price;
  const savingsPerLiter = Math.max(0, baselinePrice - cheapest.price);
  const totalSavingsUzs = Math.round(savingsPerLiter * TANK_LITERS);

  const totalLiters = withPrices.reduce((sum, _, i) => sum + (35 + (i % 15)), 0);
  const extraKm = Math.max(0, (cheapest.s.distanceKm ?? 0) - (nearest.s.distanceKm ?? 0));
  const timeSavedHours =
    Math.round(
      Math.max(0, withPrices.length * 0.15 - extraKm * 0.05) * 10,
    ) / 10;

  const avgPrice =
    withPrices.reduce((s, x) => s + x.price, 0) / withPrices.length;
  const ecoScore = Math.min(
    99,
    Math.round(70 + (savingsPerLiter / baselinePrice) * 100 + withPrices.length * 0.2),
  );

  return {
    totalSavingsUzs,
    totalLiters,
    timeSavedHours,
    ecoScore,
    avgPricePerLiter: Math.round(avgPrice),
    stationsCount: stations.length,
    cheapestStationName: cheapest.s.name,
    monthOverMonthPercent: savingsPerLiter > 0 ? 12 : 3,
  };
}

export function computeSavingsChart(stats: DashboardStats) {
  const base = stats.totalSavingsUzs / 5;
  return [
    { month: 'Yan', savings: Math.round(base * 0.7) },
    { month: 'Fev', savings: Math.round(base * 0.85) },
    { month: 'Mar', savings: Math.round(base * 1.1) },
    { month: 'Apr', savings: Math.round(base * 0.95) },
    { month: 'May', savings: stats.totalSavingsUzs },
  ];
}

export function computeMarketTrends(lat: number, lng: number): MarketTrend[] {
  const days = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
  const stations = getStationsForUser(lat, lng).slice(0, 20);

  const avg = (fuel: FuelType) => {
    const prices = stations
      .map((s) => getPrice(s, fuel))
      .filter((p): p is number => p != null);
    return prices.length
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0;
  };

  const base95 = avg('AI_95');
  const base92 = avg('AI_92');
  const baseD = avg('DIESEL');

  return days.map((day, i) => ({
    day,
    ai95: base95 + (i % 3) * 50 - 25,
    ai92: base92 + (i % 2) * 40 - 20,
    diesel: baseD + (i % 4) * 30 - 15,
  }));
}

export function buildTransactions(lat: number, lng: number, fuel: FuelType): Transaction[] {
  const stations = getStationsForUser(lat, lng).slice(0, 8);
  const dates = [
    '2026-05-26 10:15',
    '2026-05-25 14:32',
    '2026-05-24 09:15',
    '2026-05-23 18:40',
    '2026-05-22 11:05',
    '2026-05-21 16:20',
  ];

  return stations.slice(0, 6).map((s, i) => {
    const price = getPrice(s, fuel) ?? getPrice(s, 'AI_95') ?? 11000;
    const liters = 30 + (i % 4) * 5;
    return {
      id: `tx-${s.id}`,
      station: s.name,
      date: dates[i] ?? dates[0],
      fuelType: FUEL_LABELS[fuel],
      liters,
      totalUzs: Math.round(price * liters),
      status: i === 2 ? 'pending' : 'success',
    };
  });
}

export function computeRecommendation(
  lat: number,
  lng: number,
  fuel: FuelType,
): Recommendation | { message: string } {
  const stations = getStationsForUser(lat, lng);
  const withPrices = stations
    .map((s) => ({
      s,
      price: getPrice(s, fuel),
    }))
    .filter((x): x is { s: Station; price: number } => x.price != null);

  if (!withPrices.length) return { message: 'Bu yoqilg\'i turi bo\'yicha stansiya topilmadi' };

  const nearRadius = 2;
  const nearestInRadius = withPrices.filter((x) => (x.s.distanceKm ?? 0) <= nearRadius);
  const baselinePool = nearestInRadius.length ? nearestInRadius : [withPrices[0]];
  const baseline = baselinePool.reduce((best, cur) =>
    cur.price < best.price ? cur : best,
  );
  const baselineCost = baseline.price * TANK_LITERS;

  const scored = withPrices.map(({ s, price }) => {
    const rawSavings = baselineCost - price * TANK_LITERS;
    const extraKm = Math.max(0, (s.distanceKm ?? 0) - (baseline.s.distanceKm ?? 0));
    const score = rawSavings - extraKm * 500;
    return { s, price, rawSavings, extraKm, score };
  });

  const best = [...scored].sort((a, b) => b.score - a.score)[0];
  const savingsUzs = Math.round(Math.max(0, best.rawSavings));
  const extraDistanceKm =
    Math.round(Math.max(0, best.s.distanceKm! - baseline.s.distanceKm!) * 10) / 10;

  let message: string;
  if (best.s.id === baseline.s.id) {
    message = `Eng yaqin stansiya ham eng arzon: ${baseline.s.name} — ${baseline.price.toLocaleString()} UZS/L`;
  } else if (savingsUzs > 0) {
    message = `Siz ${savingsUzs.toLocaleString()} UZS tejashingiz mumkin — ${extraDistanceKm} km uzoqroqda ${best.s.name}`;
  } else {
    message = `${baseline.s.name} da qoling — eng yaqin va foydali variant`;
  }

  return {
    recommended: {
      stationId: best.s.id,
      stationName: best.s.name,
      address: best.s.address,
      pricePerLiter: best.price,
      currency: 'UZS',
      distanceKm: best.s.distanceKm ?? 0,
      travelTimeMin: best.s.travelTimeMin ?? 0,
    },
    baseline: {
      stationName: baseline.s.name,
      pricePerLiter: baseline.price,
      distanceKm: baseline.s.distanceKm ?? 0,
    },
    savingsUzs,
    extraDistanceKm,
    message,
    score: Math.round(best.score),
    alternatives: scored
      .filter((x) => x.s.id !== best.s.id)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => ({
        stationName: x.s.name,
        pricePerLiter: x.price,
        distanceKm: x.s.distanceKm ?? 0,
        savingsUzs: Math.round(Math.max(0, x.rawSavings)),
        score: Math.round(x.score),
      })),
  };
}

export function computeInsights(
  lat: number,
  lng: number,
  fuel: FuelType,
): InsightData {
  const recommendation = computeRecommendation(lat, lng, fuel);
  const stations = getStationsForUser(lat, lng);

  const topStations = stations.slice(0, 5).map((s) => {
    const seed = uzbekistanStationSeeds.find((x) => x.id === s.id);
    return {
      id: s.id,
      name: s.name,
      brand: s.brand ?? '',
      price: getPrice(s, fuel) ?? 0,
      distanceKm: s.distanceKm ?? 0,
      rating: s.ratingAvg,
      city: seed?.city ?? '',
    };
  });

  const sorted = [...stations].sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  const a = sorted[0];
  const b = sorted[1];
  const suggestedRoute =
    a && b ? `${a.name} → ${b.name}` : a?.name ?? '—';

  const routeSavingHours =
    Math.round(
      (sorted.reduce((acc, s) => acc + (s.travelTimeMin ?? 0), 0) / Math.max(sorted.length, 1)) *
        0.12 *
        10,
    ) / 10;

  return {
    recommendation,
    topStations,
    routeSavingHours: Math.min(routeSavingHours, 2.5),
    suggestedRoute,
  };
}

export function computeDeliveryQuote(
  lat: number,
  lng: number,
  fuel: FuelType,
  liters: number,
): DeliveryQuote {
  const stations = getStationsForUser(lat, lng);
  const prices = stations
    .map((s) => getPrice(s, fuel))
    .filter((p): p is number => p != null);
  const pricePerLiter = prices.length
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    : 11000;

  const fuelCost = Math.round(pricePerLiter * liters);
  const deliveryFee = 25000;
  const serviceFee = Math.round(fuelCost * 0.02);

  return {
    vehicle: { name: 'Chevrolet Malibu', plate: '01 A 123 BC' },
    fuelTypes: ['AI_95', 'AI_92', 'DIESEL'],
    pricePerLiter,
    breakdown: {
      fuelCost,
      deliveryFee,
      serviceFee,
      total: fuelCost + deliveryFee + serviceFee,
    },
  };
}

export function filterTransactions(
  transactions: Transaction[],
  query: string,
): Transaction[] {
  const q = query.trim().toLowerCase();
  if (!q) return transactions;
  return transactions.filter(
    (t) =>
      t.station.toLowerCase().includes(q) ||
      t.fuelType.toLowerCase().includes(q) ||
      t.date.includes(q),
  );
}

export function filterStationsByQuery(
  lat: number,
  lng: number,
  query: string,
  fuel: FuelType,
) {
  const stations = getStationsForUser(lat, lng);
  const q = query.trim().toLowerCase();
  if (!q) return stations.slice(0, 10);
  return stations
    .filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        (s.brand?.toLowerCase().includes(q) ?? false),
    )
    .slice(0, 10);
}
