import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockUser, mockNearbyStations, mockStats } from '@/data/mock';
import { Sparkles, Route, Leaf, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardInsightsPage() {
  return (
    <DashboardLayout title="AI Insights Center" subtitle="Personalized optimization for your routes">
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent">
        <CardContent className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold">
              Hello {mockUser.name}, I&apos;ve optimized your day
            </h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Based on your location and fuel type AI-95, we found a station where you can save
              approximately 12,000 UZS by driving 2.3 km further.
            </p>
          </div>
          <Link to="/map">
            <Button>View Optimization</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Route className="h-5 w-5 text-amber-400" />
              Optimized Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-400">-1.2h</p>
            <p className="text-sm text-slate-400">time saved vs usual route</p>
            <p className="mt-4 text-sm text-slate-500">Suggested: Lukoil Chilonzor → Shell Bodomzor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Leaf className="h-5 w-5 text-emerald-400" />
              Eco-Drive Score
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
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeDasharray={`${(mockStats.ecoScore / 100) * 301} 301`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-bold">{mockStats.ecoScore}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">Driving efficiency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-5 w-5 text-amber-400" />
              Top-Tier Near You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockNearbyStations.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3"
              >
                <div>
                  <p className="font-medium text-white">{s.name}</p>
                  <p className="text-xs text-slate-500">
                    {s.distanceKm} km · {s.rating} reyting
                  </p>
                </div>
                <p className="font-semibold text-amber-400">{s.price.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
