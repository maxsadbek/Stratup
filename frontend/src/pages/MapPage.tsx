import { useEffect, useMemo, useState } from 'react';
import { RefreshCw, CheckCircle2, MapPin, TrendingDown } from 'lucide-react';
import { StationMap } from '@/components/map/StationMap';
import { MapFilters } from '@/components/map/MapFilters';
import { StationPaymentPanel } from '@/components/map/StationPaymentPanel';
import { NearestStationsList, NearestSectionHeader } from '@/components/map/NearestStationsList';
import { StationCard } from '@/components/StationCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMapStore, MAP_TOTAL_STATIONS } from '@/store/mapStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { FUEL_LABELS } from '@/types';
import type { FuelType } from '@/types';

export function MapPage() {
  const {
    mapStations,
    nearestStations,
    rankedStations,
    userLocation,
    selectedFuel,
    selectedStation,
    selectedRegion,
    isLoading,
    mapVersion,
    fitVersion,
    lastRefreshedAt,
    setSelectedStation,
    setSelectedFuel,
    setSelectedRegion,
    refreshMap,
    detectLocation,
  } = useMapStore();

  const [refreshNote, setRefreshNote] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const init = async () => {
      const map = useMapStore.getState();
      const dash = useDashboardStore.getState();
      if (dash.selectedRegion !== map.selectedRegion) {
        map.setSelectedRegion(dash.selectedRegion);
      }
      if (dash.selectedFuel !== map.selectedFuel) {
        map.setSelectedFuel(dash.selectedFuel);
      }
      await map.refreshMap();
      try {
        setLocating(true);
        await map.detectLocation();
      } catch {
        /* default Toshkent — seed data ishlaydi */
      } finally {
        setLocating(false);
      }
    };
    init();
  }, []);

  const nearestIds = useMemo(
    () => new Set(nearestStations.map((s) => s.id)),
    [nearestStations],
  );

  const handleFuelChange = (fuel: FuelType) => {
    setSelectedFuel(fuel);
    useDashboardStore.getState().setSelectedFuel(fuel);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    useDashboardStore.getState().setSelectedRegion(region);
  };

  const handleRefresh = async () => {
    setRefreshNote(null);
    setLocating(true);
    try {
      await refreshMap();
      try {
        await detectLocation();
      } catch {
        /* joylashuvsiz ham to'liq xarita */
      }
      const state = useMapStore.getState();
      setRefreshNote(
        `${state.mapStations.length} ta AZS · eng yaqin: ${state.nearestStations[0]?.name ?? '—'} (${state.nearestStations[0]?.distanceKm ?? '—'} km)`,
      );
      setTimeout(() => setRefreshNote(null), 5000);
    } finally {
      setLocating(false);
    }
  };

  const handleLocate = async () => {
    setLocating(true);
    try {
      await detectLocation();
      const near = useMapStore.getState().nearestStations[0];
      if (near) {
        setRefreshNote(`Joylashuv yangilandi · eng yaqin: ${near.name} (${near.distanceKm} km)`);
        setTimeout(() => setRefreshNote(null), 4000);
      }
    } catch {
      alert('Joylashuv ruxsatini yoqing (brauzer sozlamalari)');
    } finally {
      setLocating(false);
    }
  };

  const cheapestList = rankedStations.slice(0, 8);
  const mapCount = mapStations.length;

  const refreshedLabel = lastRefreshedAt
    ? new Date(lastRefreshedAt).toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-900 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              O&apos;zbekiston xaritasi
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="mr-1 inline h-3.5 w-3.5" />
              Xaritada{' '}
              <strong className="text-slate-800 dark:text-slate-200">{mapCount}</strong>
              {selectedRegion === 'Barchasi' ? ` / ${MAP_TOTAL_STATIONS}` : ''} ta AZS
              {selectedRegion !== 'Barchasi' ? ` · ${selectedRegion}` : ''}
            </p>
            {nearestStations[0] && (
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Eng yaqin: {nearestStations[0].name} — {nearestStations[0].distanceKm} km
                {nearestStations[0].travelTimeMin != null &&
                  ` (~${nearestStations[0].travelTimeMin} min)`}
              </p>
            )}
            {refreshedLabel && (
              <p className="text-xs text-slate-400">Oxirgi yangilash: {refreshedLabel}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <ThemeToggle />
              <Button
                size="sm"
                variant="outline"
                onClick={handleLocate}
                disabled={locating || isLoading}
              >
                <MapPin className={`h-4 w-4 ${locating ? 'animate-pulse' : ''}`} />
                Mening joyim
              </Button>
              <Button
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading || locating}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading || locating ? 'animate-spin' : ''}`}
                />
                {isLoading || locating ? 'Yuklanmoqda...' : 'Yangilash'}
              </Button>
            </div>
            {refreshNote && (
              <p className="max-w-xs text-right text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />
                {refreshNote}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <MapFilters
            selectedFuel={selectedFuel}
            selectedRegion={selectedRegion}
            onFuelChange={handleFuelChange}
            onRegionChange={handleRegionChange}
          />
        </div>

        {mapCount < MAP_TOTAL_STATIONS && selectedRegion === 'Barchasi' && !isLoading && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            {mapCount} / {MAP_TOTAL_STATIONS} ta yuklandi — &quot;Yangilash&quot; ni bosing.
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <StationMap
              stations={mapStations}
              nearestStationIds={nearestIds}
              userLocation={userLocation}
              selectedStationId={selectedStation?.id}
              selectedRegion={selectedRegion}
              selectedFuel={selectedFuel}
              mapVersion={mapVersion}
              fitTrigger={fitVersion}
              totalExpected={MAP_TOTAL_STATIONS}
              height="560px"
              onStationClick={setSelectedStation}
              onLocate={handleLocate}
            />
          </div>

          <div className="max-h-[calc(100vh-8rem)] space-y-4 overflow-y-auto lg:max-h-[640px]">
            {selectedStation && (
              <StationPaymentPanel
                key={`${selectedStation.id}-${selectedFuel}`}
                station={selectedStation}
                fuel={selectedFuel}
                onClose={() => setSelectedStation(null)}
              />
            )}

            <div>
              <NearestSectionHeader count={nearestStations.length} />
              <div className="mt-2">
                <NearestStationsList
                  stations={nearestStations}
                  selectedFuel={selectedFuel}
                  selectedStationId={selectedStation?.id}
                  onSelect={setSelectedStation}
                  maxItems={8}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Eng arzon ({FUEL_LABELS[selectedFuel]})
                </p>
              </div>
              <div className="mt-2 space-y-2">
                {cheapestList.map((s, i) => {
                  const priceRow = s.fuelPrices?.find(
                    (p) => p.fuelType === selectedFuel && p.isAvailable,
                  );
                  if (!priceRow) return null;
                  return (
                    <StationCard
                      key={`cheap-${s.id}-${selectedFuel}`}
                      station={s}
                      price={{
                        pricePerLiter: priceRow.pricePerLiter,
                        currency: 'UZS',
                        fuelType: selectedFuel,
                      }}
                      distanceKm={s.distanceKm}
                      travelTimeMin={s.travelTimeMin}
                      rank={i + 1}
                      onClick={() => setSelectedStation(s)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
