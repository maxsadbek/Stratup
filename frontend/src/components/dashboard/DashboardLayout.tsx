import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { mockUser } from '@/data/mock';
import { Search } from 'lucide-react';

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-[#050505] dark:text-white">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4 dark:border-white/10 dark:bg-black/40">
          <div>
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Stansiya qidirish..."
                className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm">
              <span className="text-slate-500 dark:text-slate-400">{mockUser.fuelPrice.type}: </span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {mockUser.fuelPrice.price.toLocaleString()} {mockUser.fuelPrice.unit}
              </span>
            </div>
            <ThemeToggle />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-black">
              {mockUser.name[0]}
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
}
