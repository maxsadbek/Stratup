import { Navigation } from 'lucide-react';
import { StationCard } from '@/components/StationCard';
import type { Station, FuelType } from '@/types';
import { FUEL_LABELS } from '@/types';

interface Props {
  stations: Station[];
  selectedFuel: FuelType;
  selectedStationId?: string | null;
  onSelect: (station: Station) => void;
  maxItems?: number;
}

export function NearestStationsList({
  stations,
  selectedFuel,
  selectedStationId,
  onSelect,
  maxItems = 8,
}: Props) {
  const list = stations.slice(0, maxItems);

  if (list.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800">
        Yaqin stansiya topilmadi. Joylashuv ruxsatini yoqing yoki boshqa yoqilg&apos;i tanlang.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {list.map((s, i) => {
        const priceRow = s.fuelPrices?.find(
          (p) => p.fuelType === selectedFuel && p.isAvailable,
        );
        if (!priceRow) return null;
        const isActive = s.id === selectedStationId;
        return (
          <div
            key={`near-${s.id}-${selectedFuel}`}
            className={isActive ? 'ring-2 ring-blue-500 ring-offset-2 rounded-2xl dark:ring-offset-slate-900' : ''}
          >
            <StationCard
              station={s}
              price={{
                pricePerLiter: priceRow.pricePerLiter,
                currency: 'UZS',
                fuelType: selectedFuel,
              }}
              distanceKm={s.distanceKm}
              travelTimeMin={s.travelTimeMin}
              rank={i + 1}
              onClick={() => onSelect(s)}
            />
          </div>
        );
      })}
      <p className="text-center text-[10px] text-slate-400">
        {FUEL_LABELS[selectedFuel]} · masofa bo&apos;yicha saralangan
      </p>
    </div>
  );
}

export function NearestSectionHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2">
      <Navigation className="h-4 w-4 text-blue-500" />
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        Sizga eng yaqin ({count})
      </p>
    </div>
  );
}
