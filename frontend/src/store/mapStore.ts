import { create } from 'zustand';
import type { FuelType, Station, CheapestResult, Recommendation } from '@/types';
import {
  uzbekistanStationSeeds,
  seedToStation,
} from '@/data/uzbekistanStations';
import { UZ_BOUNDS } from '@/lib/geo';

const defaultLat = parseFloat(import.meta.env.VITE_DEFAULT_LAT || String(UZ_BOUNDS.center.lat));
const defaultLng = parseFloat(import.meta.env.VITE_DEFAULT_LNG || String(UZ_BOUNDS.center.lng));
const TOTAL_SEEDS = uzbekistanStationSeeds.length;
const NEAREST_LIMIT = 12;

interface MapState {
  userLocation: { lat: number; lng: number };
  mapStations: Station[];
  nearestStations: Station[];
  rankedStations: Station[];
  allStations: Station[];
  cheapest: CheapestResult[];
  recommendation: Recommendation | null;
  selectedFuel: FuelType;
  selectedStation: Station | null;
  selectedRegion: string;
  isLoading: boolean;
  mapVersion: number;
  fitVersion: number;
  lastRefreshedAt: number | null;
  setSelectedFuel: (fuel: FuelType) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedRegion: (region: string) => void;
  applyFilters: () => void;
  refreshMap: () => Promise<void>;
  detectLocation: () => Promise<void>;
  fetchNearby: () => Promise<void>;
  fetchCheapest: () => Promise<void>;
  fetchRecommendation: () => Promise<void>;
}

function buildAllStations(userLat: number, userLng: number, regionFilter: string): Station[] {
  const filtered =
    regionFilter === 'Barchasi'
      ? uzbekistanStationSeeds
      : uzbekistanStationSeeds.filter((s) => s.region === regionFilter);

  return filtered
    .map((seed) => seedToStation(seed, userLat, userLng))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
}

function getFuelPrice(station: Station, fuel: FuelType): number | null {
  const p = station.fuelPrices?.find((f) => f.fuelType === fuel && f.isAvailable);
  return p?.pricePerLiter ?? null;
}

/** Masofa bo'yicha — odamga eng yaqin */
export function rankNearestStations(
  stations: Station[],
  fuel: FuelType,
  limit = NEAREST_LIMIT,
): Station[] {
  return [...stations]
    .filter((s) => getFuelPrice(s, fuel) != null && s.distanceKm != null)
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
    .slice(0, limit);
}

/** Narx bo'yicha — eng arzon */
function rankStationsForFuel(stations: Station[], fuel: FuelType): Station[] {
  return [...stations]
    .filter((s) => getFuelPrice(s, fuel) != null)
    .sort((a, b) => {
      const pa = getFuelPrice(a, fuel)!;
      const pb = getFuelPrice(b, fuel)!;
      if (pa !== pb) return pa - pb;
      return (a.distanceKm ?? 0) - (b.distanceKm ?? 0);
    });
}

function computeCheapest(stations: Station[], selectedFuel: FuelType): CheapestResult[] {
  return rankStationsForFuel(stations, selectedFuel).map((s) => {
    const price = s.fuelPrices!.find((p) => p.fuelType === selectedFuel && p.isAvailable)!;
    return {
      station: s,
      price: {
        fuelType: selectedFuel,
        pricePerLiter: price.pricePerLiter,
        currency: price.currency,
      },
      distanceKm: s.distanceKm ?? 0,
      travelTimeMin: s.travelTimeMin ?? 0,
    };
  });
}

function commitStations(
  set: (partial: Partial<MapState>) => void,
  get: () => MapState,
  all: Station[],
  bumpFit = false,
) {
  const { selectedFuel, mapVersion, fitVersion } = get();
  const nearest = rankNearestStations(all, selectedFuel);
  const ranked = rankStationsForFuel(all, selectedFuel);
  const cheapest = computeCheapest(all, selectedFuel);
  set({
    mapStations: all,
    allStations: all,
    nearestStations: nearest,
    rankedStations: ranked,
    cheapest,
    mapVersion: mapVersion + 1,
    ...(bumpFit ? { fitVersion: fitVersion + 1 } : {}),
  });
}

function recomputeLists(set: (partial: Partial<MapState>) => void, get: () => MapState, fuel: FuelType) {
  const { mapStations, selectedStation, mapVersion } = get();
  const nearest = rankNearestStations(mapStations, fuel);
  const ranked = rankStationsForFuel(mapStations, fuel);
  const cheapest = computeCheapest(mapStations, fuel);
  set({
    selectedFuel: fuel,
    nearestStations: nearest,
    rankedStations: ranked,
    cheapest,
    mapVersion: mapVersion + 1,
  });
  if (selectedStation && !getFuelPrice(selectedStation, fuel)) {
    set({ selectedStation: null });
  }
}

export const useMapStore = create<MapState>((set, get) => ({
  userLocation: { lat: defaultLat, lng: defaultLng },
  mapStations: [],
  nearestStations: [],
  rankedStations: [],
  allStations: [],
  cheapest: [],
  recommendation: null,
  selectedFuel: 'AI_95',
  selectedStation: null,
  selectedRegion: 'Barchasi',
  isLoading: false,
  mapVersion: 0,
  fitVersion: 0,
  lastRefreshedAt: null,

  setSelectedFuel: (fuel) => {
    recomputeLists(set, get, fuel);
  },

  setSelectedStation: (station) => set({ selectedStation: station }),

  setSelectedRegion: (region) => {
    const { userLocation } = get();
    const all = buildAllStations(userLocation.lat, userLocation.lng, region);
    set({ selectedRegion: region, selectedStation: null });
    commitStations(set, get, all, true);
  },

  applyFilters: () => {
    const { userLocation, selectedRegion } = get();
    const all = buildAllStations(userLocation.lat, userLocation.lng, selectedRegion);
    commitStations(set, get, all, false);
  },

  /** Har doim to'liq O'zbekiston seed ma'lumotlari */
  refreshMap: async () => {
    set({ isLoading: true });
    try {
      const { userLocation, selectedRegion } = get();
      const all = buildAllStations(userLocation.lat, userLocation.lng, selectedRegion);
      commitStations(set, get, all, true);
      set({ lastRefreshedAt: Date.now() });
    } finally {
      set({ isLoading: false });
    }
  },

  detectLocation: () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocation not supported'));
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          set({ userLocation: { lat, lng } });
          const all = buildAllStations(lat, lng, get().selectedRegion);
          commitStations(set, get, all, false);
          set({ lastRefreshedAt: Date.now() });
          resolve();
        },
        () => reject(new Error('Location denied')),
        { enableHighAccuracy: true, timeout: 15000 },
      );
    }),

  fetchNearby: async () => {
    await get().refreshMap();
  },

  fetchCheapest: async () => {
    set({ isLoading: true });
    get().applyFilters();
    set({ isLoading: false });
  },

  fetchRecommendation: async () => {
    set({ recommendation: null, isLoading: false });
  },
}));

export const MAP_TOTAL_STATIONS = TOTAL_SEEDS;
export const NEAREST_STATIONS_LIMIT = NEAREST_LIMIT;
