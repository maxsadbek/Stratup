import { MapPin, Clock, Star } from 'lucide-react';
import type { Station, CheapestResult, FuelType } from '@/types';

export function StationCard({
  station,
  price,
  distanceKm,
  travelTimeMin,
  rank,
  onClick,
}: {
  station: Station | CheapestResult['station'];
  price?: { pricePerLiter: number; currency: string; fuelType?: FuelType };
  distanceKm?: number;
  travelTimeMin?: number;
  rank?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-amber-400/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-amber-500/30"
    >
      <div className="flex justify-between gap-2">
        <div>
          {rank != null && (
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">#{rank}</span>
          )}
          <h3 className="font-semibold text-slate-900 dark:text-white">{station.name}</h3>
          {'brand' in station && station.brand && (
            <p className="text-xs text-slate-500">{station.brand}</p>
          )}
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">{station.address}</p>
        </div>
        {price && (
          <div className="text-right">
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {price.pricePerLiter.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">UZS/L</p>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
        {distanceKm != null && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {distanceKm} km
          </span>
        )}
        {travelTimeMin != null && (
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            ~{travelTimeMin} min
          </span>
        )}
        {'ratingAvg' in station && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            {station.ratingAvg.toFixed(1)}
          </span>
        )}
      </div>
    </button>
  );
}
