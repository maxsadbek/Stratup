import { Select } from '@/components/ui/Select';
import { FuelTypeSelector } from '@/components/FuelTypeSelector';
import { uzbekistanRegions } from '@/data/uzbekistanStations';
import type { FuelType } from '@/types';
import { FUEL_LABELS } from '@/types';
import { useMapStore, MAP_TOTAL_STATIONS } from '@/store/mapStore';

interface MapFiltersProps {
  selectedFuel: FuelType;
  selectedRegion: string;
  onFuelChange: (fuel: FuelType) => void;
  onRegionChange: (region: string) => void;
}

export function MapFilters({
  selectedFuel,
  selectedRegion,
  onFuelChange,
  onRegionChange,
}: MapFiltersProps) {
  const mapStations = useMapStore((s) => s.mapStations);
  const nearestStations = useMapStore((s) => s.nearestStations);
  const rankedStations = useMapStore((s) => s.rankedStations);

  const regionOptions = uzbekistanRegions.map((r) => ({ value: r, label: r }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          Xaritada:{' '}
          <strong className="text-slate-800 dark:text-slate-200">{mapStations.length}</strong>
          {selectedRegion === 'Barchasi' ? ` / ${MAP_TOTAL_STATIONS}` : ''} ta AZS
          {selectedRegion === 'Barchasi' && (
            <span className="text-slate-400"> · 14 viloyat</span>
          )}
        </span>
        <span>
          Yaqin: <strong className="text-blue-600 dark:text-blue-400">{nearestStations.length}</strong>
          {' · '}
          Arzon:{' '}
          <strong className="text-amber-600 dark:text-amber-400">{rankedStations.length}</strong>
        </span>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1">
          <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            Yoqilg&apos;i turi
          </p>
          <FuelTypeSelector value={selectedFuel} onChange={onFuelChange} />
        </div>
        <Select
          label="Viloyat"
          value={selectedRegion}
          onChange={onRegionChange}
          options={regionOptions}
          className="w-full sm:w-64"
        />
      </div>
    </div>
  );
}
