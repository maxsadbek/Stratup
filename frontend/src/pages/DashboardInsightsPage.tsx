import { Link } from 'react-router-dom';
import { Sparkles, Route, Leaf, Star, MapPin } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FuelTypeSelector } from '@/components/FuelTypeSelector';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import { useMapStore } from '@/store/mapStore';
import { formatUzs } from '@/lib/utils';

export function DashboardInsightsPage() {
  const { insights, profile, stats } = useDashboardData();
  const { selectedFuel, setSelectedFuel } = useDashboardStore();
  const setMapFuel = useMapStore((s) => s.setSelectedFuel);
  const rec = insights.recommendation;

  const onFuelChange = (fuel: typeof selectedFuel) => {
    setSelectedFuel(fuel);
    setMapFuel(fuel);
  };

  const hasRecommendation = rec && 'recommended' in rec;

  return (
    <DashboardLayout title="AI Tavsiyalar" subtitle="Narx va masofa optimizatsiyasi">
      <div className="mb-6">
        <FuelTypeSelector value={selectedFuel} onChange={onFuelChange} />
      </div>

      <Card className="border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10">
        <CardContent className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">AI tahlil</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              Salom, {profile.name}
            </h2>
            <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
              {hasRecommendation
                ? rec.message
                : (rec as { message?: string })?.message ?? 'Ma\'lumot yuklanmoqda...'}
            </p>
            {hasRecommendation && rec.savingsUzs > 0 && (
              <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Taxminiy tejash: {formatUzs(rec.savingsUzs)} · +{rec.extraDistanceKm} km
              </p>
            )}
          </div>
          <Link to="/map">
            <Button>Xaritada ko&apos;rish</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Route className="h-5 w-5 text-amber-500" />
              Marshrut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {insights.routeSavingHours} soat
            </p>
            <p className="text-sm text-slate-500">tejash potensiali</p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Tavsiya: {insights.suggestedRoute}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Leaf className="h-5 w-5 text-emerald-500" />
              Eco ball
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-700"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeDasharray={`${(stats.ecoScore / 100) * 301} 301`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-bold">{stats.ecoScore}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">Haydash samaradorligi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-5 w-5 text-amber-500" />
              Yaqinidagi eng yaxshilar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.topStations.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{s.name}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {s.distanceKm} km · {s.city} · {s.rating.toFixed(1)}
                  </p>
                </div>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  {s.price.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
