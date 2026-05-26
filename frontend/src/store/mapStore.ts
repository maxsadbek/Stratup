import { create } from 'zustand';
import type { FuelType, Station, CheapestResult, Recommendation } from '@/types';
import {
  uzbekistanStationSeeds,
  seedToStation,
} from '@/data/uzbekistanStations';
import { UZ_BOUNDS } from '@/lib/geo';

const defaultLat = parseFloat(import.meta.env.VITE_DEFAULT_LAT || String(UZ_BOUNDS.center.lat));
const defaultLng = parseFloat(import.meta.env.VITE_DEFAULT_LNG || String(UZ_BOUNDS.center.lng));
const useMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

interface MapState {
  userLocation: { lat: number; lng: number };
  stations: Station[];
  allStations: Station[];
  cheapest: CheapestResult[];
  recommendation: Recommendation | null;
  selectedFuel: FuelType;
  selectedStation: Station | null;
  selectedRegion: string;
  isLoading: boolean;
  setSelectedFuel: (fuel: FuelType) => void;
  setSelectedStation: (station: Station | null) => void;
  setSelectedRegion: (region: string) => void;
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

export const useMapStore = create<MapState>((set, get) => ({
  userLocation: { lat: defaultLat, lng: defaultLng },
  stations: [],
  allStations: [],
  cheapest: [],
  recommendation: null,
  selectedFuel: 'AI_95',
  selectedStation: null,
  selectedRegion: 'Barchasi',
  isLoading: false,

  setSelectedFuel: (fuel) => set({ selectedFuel: fuel }),
  setSelectedStation: (station) => set({ selectedStation: station }),
  setSelectedRegion: (region) => {
    const { userLocation } = get();
    const all = buildAllStations(userLocation.lat, userLocation.lng, region);
    set({ selectedRegion: region, allStations: all, stations: all });
  },

  detectLocation: () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject(new Error('Geolocation not supported'));
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          set({ userLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
          resolve();
        },
        () => reject(new Error('Location denied')),
        { enableHighAccuracy: true, timeout: 15000 },
      );
    }),

  fetchNearby: async () => {
    set({ isLoading: true });
    const { userLocation, selectedRegion } = get();

    if (useMock) {
      const all = buildAllStations(userLocation.lat, userLocation.lng, selectedRegion);
      set({ allStations: all, stations: all, isLoading: false });
      return;
    }

    try {
      const { stationsApi } = await import('@/lib/api');
      const { data } = await stationsApi.nearby(userLocation.lat, userLocation.lng, 500);
      set({ stations: data, allStations: data, isLoading: false });
    } catch {
      const all = buildAllStations(userLocation.lat, userLocation.lng, selectedRegion);
      set({ allStations: all, stations: all, isLoading: false });
    }
  },

  fetchCheapest: async () => {
    set({ isLoading: true });
    const { allStations, stations, selectedFuel } = get();
    const source = allStations.length ? allStations : stations;

    const cheapest: CheapestResult[] = source
      .map((s) => {
        const price = s.fuelPrices?.find((p) => p.fuelType === selectedFuel && p.isAvailable);
        if (!price) return null;
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
      })
      .filter((x): x is CheapestResult => x !== null)
      .sort((a, b) => a.price.pricePerLiter - b.price.pricePerLiter);

    set({ cheapest, isLoading: false });
  },

  fetchRecommendation: async () => {
    set({ recommendation: null, isLoading: false });
  },
}));
