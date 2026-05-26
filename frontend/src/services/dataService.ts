/**
 * Data layer — switch VITE_USE_MOCK_DATA=false to use real API when backend is ready.
 */
import {
  mockStats,
  mockTransactions,
  mockMarketTrends,
  mockSavingsChart,
  mockNearbyStations,
  mockUser,
  mockDelivery,
} from '@/data/mock';
import { recommendationsApi, stationsApi } from '@/lib/api';
import type { FuelType } from '@/types';

const useMock = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

export const dataService = {
  async getDashboardStats() {
    if (useMock) return mockStats;
    return mockStats;
  },

  async getTransactions() {
    if (useMock) return mockTransactions;
    return mockTransactions;
  },

  async getMarketTrends() {
    if (useMock) return mockMarketTrends;
    return mockMarketTrends;
  },

  async getSavingsChart() {
    if (useMock) return mockSavingsChart;
    return mockSavingsChart;
  },

  async getNearbyStations(lat: number, lng: number) {
    if (useMock) return mockNearbyStations;
    const { data } = await stationsApi.nearby(lat, lng, 15);
    return data.map((s) => ({
      id: s.id,
      name: s.name,
      address: s.address,
      price: s.fuelPrices?.[0]?.pricePerLiter ?? 0,
      distanceKm: s.distanceKm ?? 0,
      rating: s.ratingAvg,
      brand: s.brand ?? '',
    }));
  },

  async getRecommendation(lat: number, lng: number, fuelType: FuelType) {
    if (useMock) return null;
    const { data } = await recommendationsApi.get(lat, lng, fuelType);
    return data;
  },

  getUserProfile() {
    return mockUser;
  },

  getDeliveryMock() {
    return mockDelivery;
  },
};
