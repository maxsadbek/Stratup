import type { FuelType } from '@/types';
import { FUEL_LABELS } from '@/types';

const FUEL_TYPES: FuelType[] = ['AI_92', 'AI_95', 'DIESEL', 'GAS'];

export function FuelTypeSelector({
  value,
  onChange,
}: {
  value: FuelType;
  onChange: (f: FuelType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Yoqilgi turi">
      {FUEL_TYPES.map((fuel) => (
        <button
          key={fuel}
          type="button"
          aria-pressed={value === fuel}
          onClick={() => onChange(fuel)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            value === fuel
              ? 'bg-amber-500 text-black ring-2 ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-800'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-amber-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
          }`}
        >
          {FUEL_LABELS[fuel]}
        </button>
      ))}
    </div>
  );
}
