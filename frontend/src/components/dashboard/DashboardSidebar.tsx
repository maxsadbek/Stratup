import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Sparkles,
  Search,
  Truck,
  Star,
  Settings,
  Fuel,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useDashboardData } from '@/hooks/useDashboardData';

const items = [
  { to: '/dashboard', label: 'Analitika', icon: LayoutDashboard, end: true },
  { to: '/dashboard/insights', label: 'AI Tavsiyalar', icon: Sparkles },
  { to: '/map', label: 'Xarita', icon: Map, external: true },
  { to: '/search', label: 'Qidiruv', icon: Search, external: true },
  { to: '/dashboard/delivery', label: 'Yetkazib berish', icon: Truck },
  { to: '/dashboard/favorites', label: 'Sevimlilar', icon: Star },
];

export function DashboardSidebar() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const { stats } = useDashboardData();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-700">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
          <Fuel className="h-5 w-5 text-black" />
        </div>
        <div className="min-w-0">
          <span className="block truncate font-bold text-slate-900 dark:text-white">
            {import.meta.env.VITE_APP_NAME || 'FuelGo'}
          </span>
          <span className="text-xs text-slate-500">{stats.stationsCount} AZS</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Asosiy
        </p>
        {items.map(({ to, label, icon: Icon, end, external }) => {
          const active = end
            ? location.pathname === to
            : location.pathname === to || location.pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-400'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {external && (
                <span className="text-[10px] text-slate-400">↗</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-700">
        <Link
          to="/dashboard/settings"
          className={cn(
            'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition',
            location.pathname === '/dashboard/settings'
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-400'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
          )}
        >
          <Settings className="h-4 w-4" />
          Sozlamalar
        </Link>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>
    </aside>
  );
}
