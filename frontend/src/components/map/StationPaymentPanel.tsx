import { useState } from 'react';
import { CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import type { Station, FuelType } from '@/types';
import { FUEL_LABELS } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatUzs } from '@/lib/utils';

type PaymentMethod = 'payme' | 'click' | 'uzcard' | 'cash';

const METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: 'payme', label: 'Payme', icon: Smartphone },
  { id: 'click', label: 'Click', icon: Smartphone },
  { id: 'uzcard', label: 'Uzcard / Humo', icon: CreditCard },
  { id: 'cash', label: 'Naqd', icon: Banknote },
];

interface Props {
  station: Station;
  fuel: FuelType;
  onClose?: () => void;
}

export function StationPaymentPanel({ station, fuel, onClose }: Props) {
  const [liters, setLiters] = useState(40);
  const [method, setMethod] = useState<PaymentMethod>('payme');
  const [paid, setPaid] = useState(false);

  const priceRow = station.fuelPrices?.find((p) => p.fuelType === fuel && p.isAvailable);
  const pricePerLiter = priceRow?.pricePerLiter ?? 0;
  const fuelCost = Math.round(pricePerLiter * liters);
  const serviceFee = method === 'cash' ? 0 : Math.round(fuelCost * 0.01);
  const total = fuelCost + serviceFee;

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => setPaid(false), 3500);
  };

  if (!priceRow) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500">
          {FUEL_LABELS[fuel]} bu stansiyada mavjud emas
        </p>
        {onClose && (
          <Button variant="outline" size="sm" className="mt-3 w-full" onClick={onClose}>
            Yopish
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200/60 bg-white p-4 dark:border-amber-500/30 dark:bg-slate-800">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{station.name}</p>
          <p className="text-xs text-slate-500">{FUEL_LABELS[fuel]} · {pricePerLiter.toLocaleString()} UZS/L</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Yopish
          </button>
        )}
      </div>

      <label className="mb-1 block text-xs font-medium text-slate-500">Litr</label>
      <p className="mb-2 text-center text-2xl font-bold text-amber-600 dark:text-amber-400">{liters} L</p>
      <input
        type="range"
        min={5}
        max={80}
        step={5}
        value={liters}
        onChange={(e) => setLiters(Number(e.target.value))}
        className="mb-4 w-full accent-amber-500"
      />

      <p className="mb-2 text-xs font-medium text-slate-500">To&apos;lov usuli</p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {METHODS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
              method === id
                ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-500/15 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-600'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-1 border-t border-slate-200 pt-3 text-sm dark:border-slate-600">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Yoqilg&apos;i</span>
          <span>{formatUzs(fuelCost)}</span>
        </div>
        {serviceFee > 0 && (
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Xizmat (1%)</span>
            <span>{formatUzs(serviceFee)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
          <span>Jami</span>
          <span className="text-amber-600 dark:text-amber-400">{formatUzs(total)}</span>
        </div>
      </div>

      {paid ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-100 py-3 text-sm text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
          <CheckCircle className="h-4 w-4" />
          To&apos;lov qabul qilindi (demo)
        </div>
      ) : (
        <Button className="mt-4 w-full" onClick={handlePay}>
          {method === 'cash' ? 'Buyurtma berish' : "To'lash"}
        </Button>
      )}
    </div>
  );
}
