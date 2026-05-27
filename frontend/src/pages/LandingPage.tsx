import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { landingFeatures, landingPricing } from '@/data/mock';
import { uzbekistanStationSeeds } from '@/data/uzbekistanStations';
import {
  Fuel,
  ArrowRight,
  Check,
  Zap,
  Shield,
  TrendingUp,
  Map,
  Sparkles,
  BarChart3,
  Truck,
} from 'lucide-react';

const featureIcons = {
  map: Map,
  sparkles: Sparkles,
  chart: BarChart3,
  truck: Truck,
};

export function LandingPage() {
  const stationCount = uzbekistanStationSeeds.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#030303] dark:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
              <Fuel className="h-5 w-5 text-black" />
            </span>
            {import.meta.env.VITE_APP_NAME || 'FuelGo'}
          </Link>
          <nav className="flex items-center gap-3">
            <Link to="/map" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Xarita
            </Link>
            <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Dashboard
            </Link>
            <ThemeToggle />
            <Link to="/auth">
              <Button size="sm">Kirish</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-700 dark:text-amber-400">
              <Zap className="h-4 w-4" />
              Butun O&apos;zbekiston bo&apos;ylab {stationCount}+ AZS
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
              Arzonroq yoqilg&apos;i toping.
              <span className="block text-amber-600 dark:text-amber-400">
                Aqlliroq haydang.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              Toshkentdan Nukusgacha — barcha viloyatlardagi benzin stansiyalari, narxlar va AI tavsiyalar.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/map">
                <Button size="lg">
                  Xaritani ochish
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="secondary" size="lg">
                  Bepul boshlash
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-16 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { icon: Fuel, value: `${stationCount}+`, label: 'AZS stansiyalar' },
            { icon: TrendingUp, value: '15%', label: 'O\'rtacha tejash' },
            { icon: Shield, value: '14', label: 'Viloyat' },
            { icon: Zap, value: 'AI', label: 'Tavsiyalar' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto h-8 w-8 text-amber-500" />
              <p className="mt-2 text-3xl font-bold">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold">
            Aqlli yonilg&apos;i boshqaruvi
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {landingFeatures.map((f) => {
              const Icon = featureIcons[f.iconKey];
              return (
                <Card key={f.title}>
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15">
                      <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="mt-4 font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-100 py-24 dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold">Narxlar</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {landingPricing.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? 'border-amber-500/50 ring-2 ring-amber-500/20' : ''}
              >
                <CardContent className="pt-8">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2">
                    <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-slate-500"> {plan.period}</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="h-4 w-4 shrink-0 text-amber-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth" className="mt-8 block">
                    <Button variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full">
                      Tanlash
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-white/10">
        © {new Date().getFullYear()} FuelGo. O&apos;zbekiston uchun.
      </footer>
    </div>
  );
}
