import { Link, useLocation } from 'react-router-dom';
import { Fuel } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Map' },
  { to: '/search', label: 'Search' },
  { to: '/dashboard', label: 'Dashboard', auth: true },
  { to: '/favorites', label: 'Favorites', auth: true },
];

export function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <Fuel className="h-5 w-5 text-black" />
          </span>
          <span>{import.meta.env.VITE_APP_NAME || 'FuelGo'}</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems
            .filter((item) => !item.auth || user)
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  location.pathname === item.to
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:bg-amber-400"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
