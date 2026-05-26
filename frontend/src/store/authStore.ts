import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { authApi } from '@/lib/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await authApi.login(email, password);
          localStorage.setItem('accessToken', data.accessToken);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
          });
        } catch {
          set({ error: 'Invalid credentials', isLoading: false });
          throw new Error('Login failed');
        }
      },
      register: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await authApi.register(email, password, name);
          localStorage.setItem('accessToken', data.accessToken);
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoading: false,
          });
        } catch {
          set({ error: 'Registration failed', isLoading: false });
          throw new Error('Register failed');
        }
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    { name: 'fuelgo-auth', partialize: (s) => ({ user: s.user, refreshToken: s.refreshToken }) },
  ),
);
