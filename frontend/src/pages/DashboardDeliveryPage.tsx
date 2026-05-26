import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockDelivery } from '@/data/mock';
import { Car, Fuel } from 'lucide-react';

const FUEL_LABELS: Record<string, string> = {
  AI_95: 'AI-95',
  AI_92: 'AI-92',
  DIESEL: 'Diesel',
};

export function DashboardDeliveryPage() {
  const [liters, setLiters] = useState(mockDelivery.selectedLiters);
  const [fuel, setFuel] = useState<(typeof mockDelivery.fuelTypes)[number]>('AI_95');

  const breakdown = {
    ...mockDelivery.breakdown,
    fuelCost: Math.round((mockDelivery.breakdown.fuelCost / 45) * liters),
    total:
      Math.round((mockDelivery.breakdown.fuelCost / 45) * liters) +
      mockDelivery.breakdown.deliveryFee +
      mockDelivery.breakdown.serviceFee,
  };

  return (
    <DashboardLayout title="On-Demand Delivery" subtitle="Fuel delivered to your location (preview)">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-amber-400" />
                Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{mockDelivery.vehicle.name}</p>
              <p className="text-sm text-slate-400">{mockDelivery.vehicle.plate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5 text-amber-400" />
                Fuel type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockDelivery.fuelTypes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuel(f)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      fuel === f
                        ? 'bg-amber-500 text-black'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {FUEL_LABELS[f]}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-center text-3xl font-bold text-amber-400">{liters} L</p>
              <input
                type="range"
                min={10}
                max={80}
                value={liters}
                onChange={(e) => setLiters(Number(e.target.value))}
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
            <CardTitle>Price breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-slate-400">
              <span>Fuel cost</span>
              <span>{breakdown.fuelCost.toLocaleString()} UZS</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery fee</span>
              <span>{breakdown.deliveryFee.toLocaleString()} UZS</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Service fee</span>
              <span>{breakdown.serviceFee.toLocaleString()} UZS</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-amber-400">{breakdown.total.toLocaleString()} UZS</span>
            </div>
            <div className="mt-6 h-40 rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-black p-4">
              <p className="text-xs text-slate-500">Delivery route preview</p>
              <div className="mt-4 flex items-end justify-between gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-500" title="You" />
                <div className="mb-2 h-0.5 flex-1 bg-dashed border-t border-dashed border-amber-500/50" />
                <div className="h-8 w-8 rounded-full bg-orange-500" title="Station" />
              </div>
            </div>
            <Button className="w-full" size="lg">
              ORDER FUEL NOW
            </Button>
            <p className="text-center text-xs text-slate-500">
              Coming soon — connect backend delivery module
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
