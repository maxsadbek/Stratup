import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { LandingPage } from '@/pages/LandingPage';
import { MapPage } from '@/pages/MapPage';
import { SearchPage } from '@/pages/SearchPage';
import { AuthPage } from '@/pages/AuthPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DashboardInsightsPage } from '@/pages/DashboardInsightsPage';
import { DashboardDeliveryPage } from '@/pages/DashboardDeliveryPage';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  if (!user && !demoMode) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

export default function App() {
  const theme = useThemeStore((s) => s.theme);
  const { pathname } = useLocation();
  const hideNavbar = pathname === '/' || pathname.startsWith('/dashboard');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#030303] dark:text-slate-100">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/insights"
            element={
              <ProtectedRoute>
                <DashboardInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/delivery"
            element={
              <ProtectedRoute>
                <DashboardDeliveryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
