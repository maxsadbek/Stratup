import { useMemo } from 'react';
import { useMapStore } from '@/store/mapStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useAuthStore } from '@/store/authStore';
import {
  computeDashboardStats,
  computeSavingsChart,
  computeMarketTrends,
  buildTransactions,
  computeInsights,
  computeDeliveryQuote,
  filterTransactions,
} from '@/services/dashboardService';

export function useDashboardData() {
  const { userLocation } = useMapStore();
  const { selectedFuel, searchQuery } = useDashboardStore();
  const user = useAuthStore((s) => s.user);

  const lat = userLocation.lat;
  const lng = userLocation.lng;

  const stats = useMemo(
    () => computeDashboardStats(lat, lng, selectedFuel),
    [lat, lng, selectedFuel],
  );

  const savingsChart = useMemo(() => computeSavingsChart(stats), [stats]);

  const marketTrends = useMemo(
    () => computeMarketTrends(lat, lng),
    [lat, lng],
  );

  const allTransactions = useMemo(
    () => buildTransactions(lat, lng, selectedFuel),
    [lat, lng, selectedFuel],
  );

  const transactions = useMemo(
    () => filterTransactions(allTransactions, searchQuery),
    [allTransactions, searchQuery],
  );

  const insights = useMemo(
    () => computeInsights(lat, lng, selectedFuel),
    [lat, lng, selectedFuel],
  );

  const profile = useMemo(
    () => ({
      name: user?.name ?? 'Foydalanuvchi',
      email: user?.email ?? 'mehmon@fuelgo.uz',
      fuelLabel: selectedFuel.replace('_', '-'),
      fuelPrice: stats.avgPricePerLiter,
    }),
    [user, selectedFuel, stats.avgPricePerLiter],
  );

  return {
    stats,
    savingsChart,
    marketTrends,
    transactions,
    allTransactions,
    insights,
    profile,
    searchQuery,
    lat,
    lng,
  };
}

export function useDeliveryQuote() {
  const { userLocation } = useMapStore();
  const { selectedFuel, deliveryLiters } = useDashboardStore();

  return useMemo(
    () => computeDeliveryQuote(userLocation.lat, userLocation.lng, selectedFuel, deliveryLiters),
    [userLocation.lat, userLocation.lng, selectedFuel, deliveryLiters],
  );
}
