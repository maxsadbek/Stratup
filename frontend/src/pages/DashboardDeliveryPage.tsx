import { useState } from 'react';
import { Car, Fuel, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDeliveryQuote } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import type { FuelType } from '@/types';
import { FUEL_LABELS } from '@/types';

export function DashboardDeliveryPage() {
  const quote = useDeliveryQuote();
  const { deliveryLiters, setDeliveryLiters, selectedFuel, setSelectedFuel } = useDashboardStore();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 4000);
  };

  return (
    <DashboardLayout
      title="Yetkazib berish"
      subtitle={`${quote.pricePerLiter.toLocaleString()} UZS/L · ${deliveryLiters} L`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-amber-500" />
                Transport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{quote.vehicle.name}</p>
              <p className="text-sm text-slate-500">{quote.vehicle.plate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-amber-500" />
                Yoqilg&apos;i turi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quote.fuelTypes.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setSelectedFuel(f)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      selectedFuel === f
                        ? 'bg-amber-500 text-black'
                        : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {FUEL_LABELS[f as FuelType]}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Miqdor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-center text-3xl font-bold text-amber-600 dark:text-amber-400">
                {deliveryLiters} L
              </p>
              <input
                type="range"
                min={10}
                max={80}
                value={deliveryLiters}
                onChange={(e) => setDeliveryLiters(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>10 L</span>
                <span>80 L</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Narx hisobi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Yoqilg&apos;i ({deliveryLiters} L × {quote.pricePerLiter.toLocaleString()})</span>
              <span>{quote.breakdown.fuelCost.toLocaleString()} UZS</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Yetkazish</span>
              <span>{quote.breakdown.deliveryFee.toLocaleString()} UZS</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Xizmat</span>
              <span>{quote.breakdown.serviceFee.toLocaleString()} UZS</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-bold dark:border-slate-700">
              <span>Jami</span>
              <span className="text-amber-600 dark:text-amber-400">
                {quote.breakdown.total.toLocaleString()} UZS
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-xs text-slate-500">Yetkazish marshruti (demo)</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" title="Siz" />
                <span className="h-0.5 flex-1 border-t-2 border-dashed border-amber-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" title="AZS" />
              </div>
            </div>
            {ordered ? (
              <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-100 py-3 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                Buyurtma qabul qilindi (demo)
              </div>
            ) : (
              <Button className="w-full" size="lg" onClick={handleOrder}>
                BUYURTMA BERISH
              </Button>
            )}
            <p className="text-center text-xs text-slate-500">
              Backend ulanganda haqiqiy buyurtma yuboriladi
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
