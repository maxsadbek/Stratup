import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isLoading, error } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('demo@fuelgo.uz');
  const [password, setPassword] = useState('FuelGo123!');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') await login(email, password);
      else await register(email, password, name || undefined);
      navigate('/dashboard');
    } catch {
      /* handled in store */
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8">
          <h1 className="text-center text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'register' && (
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              minLength={8}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {mode === 'login' ? 'Sign in' : 'Register'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-400">
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>
          <Link to="/dashboard" className="mt-4 block text-center text-sm text-amber-400">
            Continue in demo mode →
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
