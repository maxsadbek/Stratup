import { useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { MapFilters } from '@/components/map/MapFilters';
import { NearestStationsList, NearestSectionHeader } from '@/components/map/NearestStationsList';
import { StationCard } from '@/components/StationCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMapStore } from '@/store/mapStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { FUEL_LABELS } from '@/types';
import type { FuelType } from '@/types';

export function SearchPage() {
  const {
    cheapest,
    nearestStations,
    selectedFuel,
    selectedRegion,
    rankedStations,
    isLoading,
    refreshMap,
    detectLocation,
    setSelectedFuel,
    setSelectedRegion,
  } = useMapStore();

  useEffect(() => {
    const run = async () => {
      const map = useMapStore.getState();
      await map.refreshMap();
      try {
        await map.detectLocation();
      } catch {
        /* ok */
      }
    };
    run();
  }, []);

  const handleFuelChange = (fuel: FuelType) => {
    setSelectedFuel(fuel);
    useDashboardStore.getState().setSelectedFuel(fuel);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    useDashboardStore.getState().setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Eng arzon yoqilg&apos;i
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {FUEL_LABELS[selectedFuel]} · {nearestStations.length} yaqin · {rankedStations.length}{' '}
              arzon
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="mb-6">
          <MapFilters
            selectedFuel={selectedFuel}
            selectedRegion={selectedRegion}
            onFuelChange={handleFuelChange}
            onRegionChange={handleRegionChange}
          />
          <Button
            className="mt-4 w-full"
            onClick={async () => {
              await refreshMap();
              try {
                await detectLocation();
              } catch {
                /* ok */
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {isLoading ? 'Yuklanmoqda...' : 'Qidirish / Yangilash'}
          </Button>
        </div>

        <div className="mb-8">
          <NearestSectionHeader count={nearestStations.length} />
          <div className="mt-2">
            <NearestStationsList
              stations={nearestStations}
              selectedFuel={selectedFuel}
              onSelect={() => {}}
              maxItems={6}
            />
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Eng arzon</p>
        <div className="space-y-3">
          {cheapest.length === 0 && !isLoading && (
            <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">
              Natija topilmadi. Boshqa viloyat yoki yoqilg&apos;i turini tanlang.
            </p>
          )}
          {cheapest.map((item, i) => (
            <StationCard
              key={`${item.station.id}-${selectedFuel}`}
              station={item.station}
              price={{ ...item.price, fuelType: selectedFuel }}
              distanceKm={item.distanceKm}
              travelTimeMin={item.travelTimeMin}
              rank={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
