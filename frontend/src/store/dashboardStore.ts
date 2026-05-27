import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FuelType } from '@/types';

interface DashboardState {
  searchQuery: string;
  selectedFuel: FuelType;
  selectedRegion: string;
  deliveryLiters: number;
  favoriteIds: string[];
  setSearchQuery: (q: string) => void;
  setSelectedFuel: (f: FuelType) => void;
  setSelectedRegion: (r: string) => void;
  setDeliveryLiters: (l: number) => void;
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      selectedFuel: 'AI_95',
      selectedRegion: 'Barchasi',
      deliveryLiters: 45,
      favoriteIds: [],

      setSearchQuery: (q) => set({ searchQuery: q }),
      setSelectedFuel: (f) => set({ selectedFuel: f }),
      setSelectedRegion: (r) => set({ selectedRegion: r }),
      setDeliveryLiters: (l) => set({ deliveryLiters: l }),

      toggleFavorite: (stationId) => {
        const { favoriteIds } = get();
        if (favoriteIds.includes(stationId)) {
          set({ favoriteIds: favoriteIds.filter((id) => id !== stationId) });
        } else {
          set({ favoriteIds: [...favoriteIds, stationId] });
        }
      },

      isFavorite: (stationId) => get().favoriteIds.includes(stationId),
    }),
    { name: 'fuelgo-dashboard', partialize: (s) => ({ favoriteIds: s.favoriteIds, deliveryLiters: s.deliveryLiters }) },
  ),
);
