import { uzbekistanStationSeeds } from './uzbekistanStations';

export interface Transaction {
  id: string;
  station: string;
  date: string;
  fuelType: string;
  liters: number;
  totalUzs: number;
  status: 'success' | 'pending';
}

export interface MarketTrend {
  day: string;
  ai95: number;
  ai92: number;
  diesel: number;
}

export interface DashboardStation {
  id: string;
  name: string;
  address: string;
  price: number;
  distanceKm: number;
  rating: number;
  brand: string;
}

export const mockUser = {
  name: 'Rustam',
  email: 'rustam@fuelgo.uz',
  plan: 'Premium Pro Fleet',
  fuelPrice: { type: 'AI-95', price: 11200, unit: 'UZS/L' },
};

export const mockStats = {
  totalSavingsUzs: 1_240_000,
  totalLiters: 2840,
  timeSavedHours: 12.4,
  ecoScore: 87,
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    station: 'Tashkent City Fuel',
    date: '2026-05-24 14:32',
    fuelType: 'AI-95',
    liters: 45,
    totalUzs: 540_000,
    status: 'success',
  },
  {
    id: '2',
    station: 'Lukoil Chilonzor',
    date: '2026-05-23 09:15',
    fuelType: 'AI-92',
    liters: 38,
    totalUzs: 397_100,
    status: 'success',
  },
  {
    id: '3',
    station: 'Shell Bodomzor',
    date: '2026-05-22 18:40',
    fuelType: 'Diesel',
    liters: 52,
    totalUzs: 517_400,
    status: 'pending',
  },
  {
    id: '4',
    station: 'UzPetrol Amir Temur',
    date: '2026-05-21 11:05',
    fuelType: 'AI-95',
    liters: 40,
    totalUzs: 480_000,
    status: 'success',
  },
];

export const mockMarketTrends: MarketTrend[] = [
  { day: 'Mon', ai95: 11100, ai92: 10400, diesel: 9700 },
  { day: 'Tue', ai95: 11150, ai92: 10420, diesel: 9720 },
  { day: 'Wed', ai95: 11200, ai92: 10450, diesel: 9750 },
  { day: 'Thu', ai95: 11180, ai92: 10430, diesel: 9740 },
  { day: 'Fri', ai95: 11250, ai92: 10500, diesel: 9800 },
  { day: 'Sat', ai95: 11300, ai92: 10550, diesel: 9850 },
  { day: 'Sun', ai95: 11200, ai92: 10500, diesel: 9800 },
];

export const mockSavingsChart = [
  { month: 'Jan', savings: 180_000 },
  { month: 'Feb', savings: 220_000 },
  { month: 'Mar', savings: 310_000 },
  { month: 'Apr', savings: 280_000 },
  { month: 'May', savings: 450_000 },
];

export const mockNearbyStations: DashboardStation[] = uzbekistanStationSeeds
  .slice(0, 12)
  .map((s) => ({
    id: s.id,
    name: s.name,
    address: `${s.address}, ${s.city}`,
    price: s.prices.AI_95,
    distanceKm: 0,
    rating: s.ratingAvg ?? 4.5,
    brand: s.brand,
  }));

export const mockDelivery = {
  vehicle: { name: 'Chevrolet Malibu', plate: '01 A 123 BC', color: 'Black' },
  fuelTypes: ['AI_95', 'AI_92', 'DIESEL'] as const,
  selectedLiters: 45,
  breakdown: {
    fuelCost: 504_000,
    deliveryFee: 25_000,
    serviceFee: 11_500,
    total: 540_500,
  },
};

export const landingFeatures = [
  {
    title: 'Smart Map Discovery',
    description: 'Find nearest AZS stations with real-time prices and travel time.',
    iconKey: 'map' as const,
  },
  {
    title: 'AI Cost Optimization',
    description: 'Save money by balancing distance vs fuel price automatically.',
    iconKey: 'sparkles' as const,
  },
  {
    title: 'Fleet Analytics',
    description: 'Track liters, savings, and refuel history in one dashboard.',
    iconKey: 'chart' as const,
  },
  {
    title: 'On-Demand Delivery',
    description: 'Order fuel to your location — coming soon for premium users.',
    iconKey: 'truck' as const,
  },
];

export const landingPricing = [
  {
    name: 'Free',
    price: '0',
    features: ['Map & search', '5 favorites', 'Basic recommendations'],
  },
  {
    name: 'Pro',
    price: '49,000',
    period: 'UZS/mo',
    features: ['AI insights', 'Unlimited favorites', 'Price alerts', 'History export'],
    highlighted: true,
  },
  {
    name: 'Fleet',
    price: '199,000',
    period: 'UZS/mo',
    features: ['Multi-vehicle', 'Fleet dashboard', 'API access', 'Priority support'],
  },
];
