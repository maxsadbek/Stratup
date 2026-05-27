import { Link } from 'react-router-dom';
import { Star, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/store/mapStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { useEffect } from 'react';
import { FUEL_LABELS } from '@/types';
import type { FuelType } from '@/types';

export function DashboardFavoritesPage() {
  const { allStations, fetchNearby, selectedFuel } = useMapStore();
  const { favoriteIds, toggleFavorite } = useDashboardStore();

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const favorites = allStations.filter((s) => favoriteIds.includes(s.id));

  return (
    <DashboardLayout
      title="Sevimlilar"
      subtitle={`${favorites.length} ta saqlangan stansiya`}
    >
      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Hali sevimli stansiya yo&apos;q
            </p>
            <Link to="/map" className="mt-4 inline-block">
              <Button size="sm">Xaritadan qo&apos;shish</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {favorites.map((s) => {
            const price = s.fuelPrices?.find((p) => p.fuelType === selectedFuel);
            return (
              <Card key={s.id}>
                <CardContent className="flex items-start justify-between gap-4 pt-6">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                    <p className="text-sm text-slate-500">{s.brand}</p>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">{s.address}</p>
                    {price && (
                      <p className="mt-2 font-bold text-amber-600 dark:text-amber-400">
                        {FUEL_LABELS[selectedFuel as FuelType]}:{' '}
                        {price.pricePerLiter.toLocaleString()} UZS/L
                      </p>
                    )}
                    {s.distanceKm != null && (
                      <p className="text-xs text-slate-500">{s.distanceKm} km</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(s.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    title="Olib tashlash"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
