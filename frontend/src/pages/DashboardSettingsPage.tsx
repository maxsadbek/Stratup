import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useDashboardStore } from '@/store/dashboardStore';
import { useMapStore } from '@/store/mapStore';
import { useAuthStore } from '@/store/authStore';
import { uzbekistanRegions } from '@/data/uzbekistanStations';
import { useThemeStore } from '@/store/themeStore';

export function DashboardSettingsPage() {
  const user = useAuthStore((s) => s.user);
  const { theme } = useThemeStore();
  const { selectedRegion, setSelectedRegion, selectedFuel, setSelectedFuel } = useDashboardStore();
  const setMapRegion = useMapStore((s) => s.setSelectedRegion);
  const setMapFuel = useMapStore((s) => s.setSelectedFuel);

  const regionOptions = uzbekistanRegions.map((r) => ({ value: r, label: r }));
  const fuelOptions = [
    { value: 'AI_95', label: 'AI-95' },
    { value: 'AI_92', label: 'AI-92' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'GAS', label: 'Gas' },
  ];

  const onRegionChange = (v: string) => {
    setSelectedRegion(v);
    setMapRegion(v);
  };

  const onFuelChange = (v: string) => {
    setSelectedFuel(v as typeof selectedFuel);
    setMapFuel(v as typeof selectedFuel);
  };

  return (
    <DashboardLayout title="Sozlamalar" subtitle="Hisob va ko&apos;rinish">
      <div className="mx-auto max-w-lg space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Ism: </span>
              {user?.name ?? 'Mehmon'}
            </p>
            <p>
              <span className="text-slate-500">Email: </span>
              {user?.email ?? '—'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ko&apos;rinish</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Joriy: {theme === 'dark' ? "Qorong'u" : 'Yorug'}
            </span>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Standart filtrlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Viloyat"
              value={selectedRegion}
              onChange={onRegionChange}
              options={regionOptions}
            />
            <Select
              label="Yoqilg'i turi"
              value={selectedFuel}
              onChange={onFuelChange}
              options={fuelOptions}
            />
            <p className="text-xs text-slate-500">
              Bu sozlamalar dashboard, xarita va qidiruvda qo&apos;llaniladi.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
