import { useQuery } from '@tanstack/react-query';
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
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { dataService } from '@/services/dataService';
import { formatUzs } from '@/lib/utils';
import { TrendingUp, Droplets, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dataService.getDashboardStats(),
  });
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => dataService.getTransactions(),
  });
  const { data: savingsChart } = useQuery({
    queryKey: ['savings-chart'],
    queryFn: () => dataService.getSavingsChart(),
  });
  const { data: marketTrends } = useQuery({
    queryKey: ['market-trends'],
    queryFn: () => dataService.getMarketTrends(),
  });

  return (
    <DashboardLayout
      title="Fleet Analytics"
      subtitle="Track savings, fuel usage, and refuel history"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-400">
              {formatUzs(stats?.totalSavingsUzs ?? 0)}
            </p>
            <div className="mt-6 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsChart ?? []}>
                  <defs>
                    <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f172a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                    }}
                    formatter={(v: number) => [formatUzs(v), 'Savings']}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#f59e0b"
                    fill="url(#savingsGrad)"
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
              <Droplets className="h-5 w-5 text-blue-400" />
              Total Fuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats?.totalLiters.toLocaleString()} L</p>
            <p className="mt-2 text-sm text-slate-400">This month across all vehicles</p>
            <div className="mt-6 flex items-center gap-2 text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">+12% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15">
              <Clock className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Time saved</p>
              <p className="text-2xl font-bold">{stats?.timeSavedHours} h</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-amber-600/30 to-orange-600/20 p-6">
            <h3 className="text-lg font-bold">Premium Pro Fleet</h3>
            <p className="mt-1 text-sm text-slate-300">
              Unlock multi-vehicle tracking, API access, and priority AI insights.
            </p>
            <Link to="/auth">
              <Button size="sm" className="mt-4">
                View Full Benefits
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Market Trends (UZS/L)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketTrends ?? []}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="ai95" fill="#f59e0b" radius={[4, 4, 0, 0]} name="AI-95" />
                <Bar dataKey="ai92" fill="#3b82f6" radius={[4, 4, 0, 0]} name="AI-92" />
                <Bar dataKey="diesel" fill="#64748b" radius={[4, 4, 0, 0]} name="Diesel" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="px-6 py-3 font-medium">Station</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Fuel</th>
                <th className="px-6 py-3 font-medium">Liters</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx) => (
                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">{tx.station}</td>
                  <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                  <td className="px-6 py-4">{tx.fuelType}</td>
                  <td className="px-6 py-4">{tx.liters.toFixed(2)} L</td>
                  <td className="px-6 py-4 text-amber-400/90">{formatUzs(tx.totalUzs)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={tx.status === 'success' ? 'success' : 'pending'}>
                      {tx.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
