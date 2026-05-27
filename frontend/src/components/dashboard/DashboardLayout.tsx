import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useDashboardStore } from '@/store/dashboardStore';
import { Search } from 'lucide-react';

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: Props) {
  const { profile } = useDashboardData();
  const { searchQuery, setSearchQuery } = useDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/map`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <DashboardSidebar />

      <div className="ml-60 flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-900">
          <div className="min-w-0">
            {title && (
              <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Stansiya, tarix qidirish..."
                className="h-10 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div className="hidden rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm md:block dark:border-amber-500/30 dark:bg-amber-500/10">
              <span className="text-slate-500 dark:text-slate-400">{profile.fuelLabel}: </span>
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                {profile.fuelPrice.toLocaleString()} UZS/L
              </span>
            </div>
            <ThemeToggle />
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-black"
              title={profile.email}
            >
              {profile.name[0]?.toUpperCase() ?? 'F'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  );
}
