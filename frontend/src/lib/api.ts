import axios from 'axios';
import type { FuelType, Station, CheapestResult, Recommendation, User } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: (email: string, password: string, name?: string) =>
    api.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', {
      email,
      password,
      name,
    }),
  login: (email: string, password: string) =>
    api.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', {
      email,
      password,
    }),
};

export const stationsApi = {
  nearby: (lat: number, lng: number, radiusKm = 10) =>
    api.get<Station[]>('/stations/nearby', { params: { lat, lng, radiusKm } }),
};

export const searchApi = {
  cheapest: (lat: number, lng: number, fuelType: FuelType, radiusKm = 15) =>
    api.get<CheapestResult[]>('/search/cheapest', {
      params: { lat, lng, fuelType, radiusKm },
    }),
};

export const recommendationsApi = {
  get: (lat: number, lng: number, fuelType: FuelType, tankLiters?: number) =>
    api.get<Recommendation | { message: string }>('/recommendations', {
      params: { lat, lng, fuelType, tankLiters },
    }),
};

export const usersApi = {
  favorites: () => api.get('/users/favorites'),
  addFavorite: (stationId: string) => api.post('/users/favorites', { stationId }),
};

export default api;
