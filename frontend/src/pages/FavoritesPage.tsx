import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { uzbekistanStationSeeds, seedToStation } from '@/data/uzbekistanStations';
import { StationCard } from '@/components/StationCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { Station } from '@/types';
import { UZ_BOUNDS } from '@/lib/geo';

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<Station[]>([]);

  useEffect(() => {
    const seeds = uzbekistanStationSeeds.slice(0, 6);
    setFavorites(
      seeds.map((s) =>
        seedToStation(s, UZ_BOUNDS.center.lat, UZ_BOUNDS.center.lng),
      ),
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 dark:bg-[#050505]">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sevimlilar</h1>
          <ThemeToggle />
        </div>
        <div className="space-y-3">
          {favorites.length === 0 ? (
            <p className="text-slate-500">
              Hali sevimli yo&apos;q.{' '}
              <Link to="/map" className="text-amber-600 dark:text-amber-400">
                Xaritani ochish
              </Link>
            </p>
          ) : (
            favorites.map((s) => <StationCard key={s.id} station={s} />)
          )}
        </div>
      </div>
    </div>
  );
}
