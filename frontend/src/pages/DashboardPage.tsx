import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Link } from 'react-router-dom';
import { TrendingUp, Droplets, Clock, ArrowUpRight, Fuel } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FuelTypeSelector } from '@/components/FuelTypeSelector';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import { useMapStore } from '@/store/mapStore';
import { formatUzs } from '@/lib/utils';

export function DashboardPage() {
  const { stats, savingsChart, marketTrends, transactions, searchQuery } = useDashboardData();
  const { selectedFuel, setSelectedFuel } = useDashboardStore();
  const fetchNearby = useMapStore((s) => s.fetchNearby);
  const setMapFuel = useMapStore((s) => s.setSelectedFuel);

  const onFuelChange = (fuel: typeof selectedFuel) => {
    setSelectedFuel(fuel);
    setMapFuel(fuel);
  };

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  return (
    <DashboardLayout
      title="Fleet Analytics"
      subtitle={`${stats.stationsCount} stansiya · eng arzon: ${stats.cheapestStationName}`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <FuelTypeSelector value={selectedFuel} onChange={onFuelChange} />
        <Link to="/dashboard/insights">
          <Button variant="outline" size="sm">
            AI tavsiya ko&apos;rish
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              Jami tejash ({selectedFuel.replace('_', '-')})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {formatUzs(stats.totalSavingsUzs)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              ~{stats.avgPricePerLiter.toLocaleString()} UZS/L o&apos;rtacha narx
            </p>
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsChart}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => [formatUzs(v), 'Tejash']} />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              Sarflangan yoqilg&apos;i
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-slate-900 dark:text-white">
              {stats.totalLiters.toLocaleString()} L
            </p>
            <p className="mt-2 text-sm text-slate-500">Hisoblangan (mock tarix)</p>
            <div className="mt-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">+{stats.monthOverMonthPercent}% o&apos;tgan oyga</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/15">
              <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Vaqt tejaldi</p>
              <p className="text-2xl font-bold">{stats.timeSavedHours} soat</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/15">
              <Fuel className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Eco ball</p>
              <p className="text-2xl font-bold">{stats.ecoScore}/100</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200 dark:border-amber-500/30">
          <CardContent className="pt-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Premium Pro</h3>
            <p className="mt-1 text-sm text-slate-500">Fleet va API</p>
            <Link to="/auth">
              <Button size="sm" className="mt-3">
                Batafsil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bozor narxlari (UZS/L)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketTrends}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="ai95" fill="#f59e0b" radius={[4, 4, 0, 0]} name="AI-95" />
                <Bar dataKey="ai92" fill="#3b82f6" radius={[4, 4, 0, 0]} name="AI-92" />
                <Bar dataKey="diesel" fill="#64748b" radius={[4, 4, 0, 0]} name="Diesel" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quvvatlash tarixi</CardTitle>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              Filtr: &quot;{searchQuery}&quot; ({transactions.length})
            </span>
          )}
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          {transactions.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              Natija topilmadi. Qidiruvni o&apos;zgartiring.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700">
                  <th className="px-6 py-3 font-medium">Stansiya</th>
                  <th className="px-6 py-3 font-medium">Sana</th>
                  <th className="px-6 py-3 font-medium">Yoqilg&apos;i</th>
                  <th className="px-6 py-3 font-medium">Litr</th>
                  <th className="px-6 py-3 font-medium">Summa</th>
                  <th className="px-6 py-3 font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-medium">{tx.station}</td>
                    <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                    <td className="px-6 py-4">{tx.fuelType}</td>
                    <td className="px-6 py-4">{tx.liters.toFixed(1)} L</td>
                    <td className="px-6 py-4 font-medium text-amber-700 dark:text-amber-400">
                      {formatUzs(tx.totalUzs)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={tx.status === 'success' ? 'success' : 'pending'}>
                        {tx.status === 'success' ? 'muvaffaqiyat' : 'kutilmoqda'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
