import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Sparkles,
  BarChart3,
  Truck,
  Star,
  Settings,
  Fuel,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { to: '/dashboard', label: 'Analytics', icon: LayoutDashboard },
  { to: '/dashboard/insights', label: 'AI Insights', icon: Sparkles },
  { to: '/map', label: 'Live Map', icon: Map },
  { to: '/search', label: 'Search', icon: BarChart3 },
  { to: '/dashboard/delivery', label: 'Delivery', icon: Truck },
  { to: '/favorites', label: 'Favorites', icon: Star },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-black/40 p-4">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
          <Fuel className="h-5 w-5 text-black" />
        </div>
        <span className="text-lg font-bold text-white">
          {import.meta.env.VITE_APP_NAME || 'FuelGo'}
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active =
            location.pathname === to ||
            (to !== '/dashboard' && location.pathname.startsWith(to)) ||
            (to === '/dashboard' && location.pathname === '/dashboard');
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/auth"
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
      >
        <Settings className="h-5 w-5" />
        Settings
      </Link>
    </aside>
  );
}
