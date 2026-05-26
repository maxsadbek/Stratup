import { useEffect } from 'react';
import { FuelTypeSelector } from '@/components/FuelTypeSelector';
import { StationCard } from '@/components/StationCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useMapStore } from '@/store/mapStore';
import { Button } from '@/components/ui/Button';
import { uzbekistanRegions } from '@/data/uzbekistanStations';

export function SearchPage() {
  const {
    cheapest,
    selectedFuel,
    selectedRegion,
    isLoading,
    setSelectedFuel,
    setSelectedRegion,
    fetchCheapest,
    fetchNearby,
  } = useMapStore();

  useEffect(() => {
    fetchNearby().then(() => fetchCheapest());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-[#050505] lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Eng arzon yoqilg&apos;i
            </h1>
            <p className="text-sm text-slate-500">Butun O&apos;zbekiston bo&apos;yicha</p>
          </div>
          <ThemeToggle />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setTimeout(() => fetchCheapest(), 100);
          }}
          className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {uzbekistanRegions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <FuelTypeSelector
          value={selectedFuel}
          onChange={async (f) => {
            setSelectedFuel(f);
            await fetchCheapest();
          }}
        />

        <Button className="mt-4 w-full" onClick={fetchCheapest} disabled={isLoading}>
          Qidirish
        </Button>

        <div className="mt-6 space-y-3">
          {cheapest.map((item, i) => (
            <StationCard
              key={item.station.id}
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
