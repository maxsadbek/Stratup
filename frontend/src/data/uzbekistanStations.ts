import type { FuelType, Station } from '@/types';
import { haversineKm, estimateTravelMin } from '@/lib/geo';
import { uzbekistanStationsExtra } from './uzbekistanStationsExtra';
import type { StationSeed } from './stationSeedHelper';

export type { StationSeed } from './stationSeedHelper';

/** O'zbekiston bo'ylab AZS — barcha viloyatlar */
export const uzbekistanStationSeeds: StationSeed[] = [
  // Toshkent shahri
  { id: 'uz-tash-1', name: 'UzPetrol Amir Temur', brand: 'UzPetrol', city: 'Toshkent', region: 'Toshkent', address: 'Amir Temur ko\'chasi 108', latitude: 41.3112, longitude: 69.2798, prices: { AI_92: 10500, AI_95: 11200, DIESEL: 9800, GAS: 4200 }, ratingAvg: 4.5 },
  { id: 'uz-tash-2', name: 'Lukoil Chilonzor', brand: 'Lukoil', city: 'Toshkent', region: 'Toshkent', address: 'Chilonzor 9-kvartal', latitude: 41.2856, longitude: 69.2045, prices: { AI_92: 10450, AI_95: 11150, DIESEL: 9750, GAS: 4100 }, ratingAvg: 4.4 },
  { id: 'uz-tash-3', name: 'Shell Bodomzor', brand: 'Shell', city: 'Toshkent', region: 'Toshkent', address: 'Bodomzor metro yonida', latitude: 41.3267, longitude: 69.2878, prices: { AI_92: 10700, AI_95: 11400, DIESEL: 9950, GAS: 4400 }, ratingAvg: 4.7 },
  { id: 'uz-tash-4', name: 'Neftchi Yunusabad', brand: 'Neftchi', city: 'Toshkent', region: 'Toshkent', address: 'Yunusabad 4-mavze', latitude: 41.3542, longitude: 69.2891, prices: { AI_92: 10600, AI_95: 11300, DIESEL: 9900, GAS: 4300 } },
  { id: 'uz-tash-5', name: 'GazOil Sergeli', brand: 'GazOil', city: 'Toshkent', region: 'Toshkent', address: 'Sergeli-7', latitude: 41.2234, longitude: 69.2156, prices: { AI_92: 10380, AI_95: 11080, DIESEL: 9680, GAS: 4050 } },
  // Toshkent viloyati
  { id: 'uz-tov-1', name: 'Chirchiq Oil Service', brand: 'Petroline', city: 'Chirchiq', region: 'Toshkent viloyati', address: 'Mustaqillik ko\'chasi', latitude: 41.4689, longitude: 69.5822, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 } },
  { id: 'uz-tov-2', name: 'Angren Neft', brand: 'UzPetrol', city: 'Angren', region: 'Toshkent viloyati', address: 'Markaziy ko\'cha', latitude: 41.0167, longitude: 70.1436, prices: { AI_92: 10390, AI_95: 11090, DIESEL: 9690, GAS: 4060 } },
  { id: 'uz-tov-3', name: 'Bekabad Fuel', brand: 'Lukoil', city: 'Bekobod', region: 'Toshkent viloyati', address: 'Sirdaryo yo\'li', latitude: 40.2203, longitude: 69.2236, prices: { AI_92: 10400, AI_95: 11100, DIESEL: 9700, GAS: 4070 } },
  { id: 'uz-tov-4', name: 'Olmaliq GazOil', brand: 'GazOil', city: 'Olmaliq', region: 'Toshkent viloyati', address: 'Metallurglar ko\'chasi', latitude: 40.8447, longitude: 69.5983, prices: { AI_92: 10410, AI_95: 11110, DIESEL: 9710, GAS: 4090 } },
  // Samarqand
  { id: 'uz-sam-1', name: 'Samarqand City Fuel', brand: 'UzPetrol', city: 'Samarqand', region: 'Samarqand', address: 'Registon ko\'chasi', latitude: 39.6542, longitude: 66.9597, prices: { AI_92: 10480, AI_95: 11180, DIESEL: 9780, GAS: 4120 }, ratingAvg: 4.6 },
  { id: 'uz-sam-2', name: 'Lukoil Samarqand', brand: 'Lukoil', city: 'Samarqand', region: 'Samarqand', address: 'Beruniy ko\'chasi', latitude: 39.6721, longitude: 66.9472, prices: { AI_92: 10460, AI_95: 11160, DIESEL: 9760, GAS: 4110 } },
  { id: 'uz-sam-3', name: 'Urgut Oil', brand: 'Turon', city: 'Urgut', region: 'Samarqand', address: 'Markaziy bozor yonida', latitude: 39.4022, longitude: 67.2431, prices: { AI_92: 10430, AI_95: 11130, DIESEL: 9730, GAS: 4100 } },
  { id: 'uz-sam-4', name: 'Kattaqo\'rg\'on Neft', brand: 'Neftchi', city: 'Kattaqo\'rg\'on', region: 'Samarqand', address: 'Navoiy shoh ko\'chasi', latitude: 39.8989, longitude: 66.2561, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 } },
  // Buxoro
  { id: 'uz-bux-1', name: 'Buxoro Premium Fuel', brand: 'Shell', city: 'Buxoro', region: 'Buxoro', address: 'Mustaqillik ko\'chasi', latitude: 39.7681, longitude: 64.4556, prices: { AI_92: 10520, AI_95: 11220, DIESEL: 9820, GAS: 4150 }, ratingAvg: 4.5 },
  { id: 'uz-bux-2', name: 'Lukoil Buxoro', brand: 'Lukoil', city: 'Buxoro', region: 'Buxoro', address: 'G\'ijduvon yo\'li', latitude: 39.7512, longitude: 64.4221, prices: { AI_92: 10500, AI_95: 11200, DIESEL: 9800, GAS: 4140 } },
  { id: 'uz-bux-3', name: 'Kogon Oil Center', brand: 'UzPetrol', city: 'Kogon', region: 'Buxoro', address: 'Amu Darya ko\'chasi', latitude: 39.7228, longitude: 64.5517, prices: { AI_92: 10490, AI_95: 11190, DIESEL: 9790, GAS: 4130 } },
  // Qashqadaryo
  { id: 'uz-qash-1', name: 'Qarshi Main AZS', brand: 'UzPetrol', city: 'Qarshi', region: 'Qashqadaryo', address: 'Mustaqillik shoh ko\'chasi', latitude: 38.8606, longitude: 65.7891, prices: { AI_92: 10440, AI_95: 11140, DIESEL: 9740, GAS: 4100 } },
  { id: 'uz-qash-2', name: 'Shahrisabz Fuel', brand: 'GazOil', city: 'Shahrisabz', region: 'Qashqadaryo', address: 'Amir Temur ko\'chasi', latitude: 39.0578, longitude: 66.8342, prices: { AI_92: 10450, AI_95: 11150, DIESEL: 9750, GAS: 4110 } },
  // Surxondaryo
  { id: 'uz-sur-1', name: 'Termez Border Fuel', brand: 'Lukoil', city: 'Termiz', region: 'Surxondaryo', address: 'Afrosiyob ko\'chasi', latitude: 37.2242, longitude: 67.2783, prices: { AI_92: 10470, AI_95: 11170, DIESEL: 9770, GAS: 4120 } },
  { id: 'uz-sur-2', name: 'Denov Oil', brand: 'UzPetrol', city: 'Denov', region: 'Surxondaryo', address: 'Markaz ko\'chasi', latitude: 38.2672, longitude: 67.8989, prices: { AI_92: 10460, AI_95: 11160, DIESEL: 9760, GAS: 4110 } },
  // Jizzax
  { id: 'uz-jiz-1', name: 'Jizzax Oil Service', brand: 'Petroline', city: 'Jizzax', region: 'Jizzax', address: 'Sharof Rashidov ko\'chasi', latitude: 40.1158, longitude: 67.8422, prices: { AI_92: 10430, AI_95: 11130, DIESEL: 9730, GAS: 4090 } },
  { id: 'uz-jiz-2', name: 'G\'allaorol Neft', brand: 'Neftchi', city: 'G\'allaorol', region: 'Jizzax', address: 'Toshkent yo\'li', latitude: 40.0217, longitude: 67.5958, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 } },
  // Sirdaryo
  { id: 'uz-sir-1', name: 'Guliston Fuel', brand: 'UzPetrol', city: 'Guliston', region: 'Sirdaryo', address: 'Navoiy ko\'chasi', latitude: 40.4897, longitude: 68.7842, prices: { AI_92: 10410, AI_95: 11110, DIESEL: 9710, GAS: 4070 } },
  { id: 'uz-sir-2', name: 'Yangiyer Oil', brand: 'GazOil', city: 'Yangiyer', region: 'Sirdaryo', address: 'Markaziy ko\'cha', latitude: 40.2753, longitude: 68.8225, prices: { AI_92: 10400, AI_95: 11100, DIESEL: 9700, GAS: 4060 } },
  // Navoiy
  { id: 'uz-nav-1', name: 'Navoiy City Fuel', brand: 'Lukoil', city: 'Navoiy', region: 'Navoiy', address: 'Galaba shoh ko\'chasi', latitude: 40.0844, longitude: 65.3792, prices: { AI_92: 10450, AI_95: 11150, DIESEL: 9750, GAS: 4100 } },
  { id: 'uz-nav-2', name: 'Zarafshon Oil', brand: 'UzPetrol', city: 'Zarafshon', region: 'Navoiy', address: 'Konchilar ko\'chasi', latitude: 41.5761, longitude: 64.2014, prices: { AI_92: 10480, AI_95: 11180, DIESEL: 9780, GAS: 4120 } },
  { id: 'uz-nav-3', name: 'Uchkuduk Neft', brand: 'Neftchi', city: 'Uchkuduk', region: 'Navoiy', address: 'G\'az yo\'li', latitude: 42.1567, longitude: 63.5567, prices: { AI_92: 10510, AI_95: 11210, DIESEL: 9810, GAS: 4140 } },
  // Xorazm
  { id: 'uz-xor-1', name: 'Urganch Lukoil', brand: 'Lukoil', city: 'Urganch', region: 'Xorazm', address: 'Al Xorazmiy ko\'chasi', latitude: 41.55, longitude: 60.6333, prices: { AI_92: 10490, AI_95: 11190, DIESEL: 9790, GAS: 4130 }, ratingAvg: 4.4 },
  { id: 'uz-xor-2', name: 'Xiva Oil Center', brand: 'UzPetrol', city: 'Xiva', region: 'Xorazm', address: 'Pahlavon Mahmud ko\'chasi', latitude: 41.3775, longitude: 60.3639, prices: { AI_92: 10500, AI_95: 11200, DIESEL: 9800, GAS: 4140 } },
  { id: 'uz-xor-4', name: 'Xonqa Fuel', brand: 'GazOil', city: 'Xonqa', region: 'Xorazm', address: 'Markaz ko\'chasi', latitude: 41.4361, longitude: 60.8203, prices: { AI_92: 10480, AI_95: 11180, DIESEL: 9780, GAS: 4120 } },
  // Qoraqalpog'iston
  { id: 'uz-qor-1', name: 'Nukus Main AZS', brand: 'UzPetrol', city: 'Nukus', region: 'Qoraqalpog\'iston', address: 'Dosnazarov ko\'chasi', latitude: 42.4611, longitude: 59.6003, prices: { AI_92: 10530, AI_95: 11230, DIESEL: 9830, GAS: 4160 } },
  { id: 'uz-qor-2', name: 'Mo\'ynoq Oil', brand: 'Neftchi', city: 'Mo\'ynoq', region: 'Qoraqalpog\'iston', address: 'Aral ko\'rfazi yo\'li', latitude: 43.7686, longitude: 59.0214, prices: { AI_92: 10550, AI_95: 11250, DIESEL: 9850, GAS: 4180 } },
  { id: 'uz-qor-3', name: 'Taxiatosh Fuel', brand: 'Lukoil', city: 'Taxiatosh', region: 'Qoraqalpog\'iston', address: 'Amudaryo ko\'chasi', latitude: 42.3361, longitude: 59.6236, prices: { AI_92: 10520, AI_95: 11220, DIESEL: 9820, GAS: 4150 } },
  // Andijon
  { id: 'uz-and-1', name: 'Andijon City Fuel', brand: 'Lukoil', city: 'Andijon', region: 'Andijon', address: 'Boburshoh ko\'chasi', latitude: 40.7821, longitude: 72.3442, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 }, ratingAvg: 4.3 },
  { id: 'uz-and-2', name: 'Asaka Oil', brand: 'UzPetrol', city: 'Asaka', region: 'Andijon', address: 'Toshkent yo\'li', latitude: 40.6417, longitude: 72.2386, prices: { AI_92: 10410, AI_95: 11110, DIESEL: 9710, GAS: 4070 } },
  { id: 'uz-and-3', name: 'Xonobod Neft', brand: 'GazOil', city: 'Xonobod', region: 'Andijon', address: 'Markaz ko\'chasi', latitude: 40.2286, longitude: 72.0281, prices: { AI_92: 10400, AI_95: 11100, DIESEL: 9700, GAS: 4060 } },
  // Namangan
  { id: 'uz-nam-1', name: 'Namangan Lukoil', brand: 'Lukoil', city: 'Namangan', region: 'Namangan', address: 'M.Ulug\'bek ko\'chasi', latitude: 40.9983, longitude: 71.6726, prices: { AI_92: 10430, AI_95: 11130, DIESEL: 9730, GAS: 4090 } },
  { id: 'uz-nam-2', name: 'Chortoq Oil', brand: 'UzPetrol', city: 'Chortoq', region: 'Namangan', address: 'Bo\'ri ko\'chasi', latitude: 41.0667, longitude: 71.8333, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 } },
  { id: 'uz-nam-3', name: 'Uychi Fuel', brand: 'Petroline', city: 'Uychi', region: 'Namangan', address: 'Markaz ko\'chasi', latitude: 41.0792, longitude: 71.9236, prices: { AI_92: 10410, AI_95: 11110, DIESEL: 9710, GAS: 4070 } },
  // Farg'ona
  { id: 'uz-far-1', name: 'Farg\'ona City AZS', brand: 'Shell', city: 'Farg\'ona', region: 'Farg\'ona', address: 'Al-Farg\'oniy ko\'chasi', latitude: 40.3842, longitude: 71.7843, prices: { AI_92: 10440, AI_95: 11140, DIESEL: 9740, GAS: 4100 }, ratingAvg: 4.5 },
  { id: 'uz-far-2', name: 'Qo\'qon Oil', brand: 'Lukoil', city: 'Qo\'qon', region: 'Farg\'ona', address: 'Istiqlol ko\'chasi', latitude: 40.5286, longitude: 70.9425, prices: { AI_92: 10430, AI_95: 11130, DIESEL: 9730, GAS: 4090 } },
  { id: 'uz-far-3', name: 'Marg\'ilon Fuel', brand: 'UzPetrol', city: 'Marg\'ilon', region: 'Farg\'ona', address: 'Bog\'ishamol ko\'chasi', latitude: 40.4737, longitude: 71.7244, prices: { AI_92: 10420, AI_95: 11120, DIESEL: 9720, GAS: 4080 } },
  { id: 'uz-far-4', name: 'Quva Neft', brand: 'Neftchi', city: 'Quva', region: 'Farg\'ona', address: 'Markaz ko\'chasi', latitude: 40.5219, longitude: 72.0728, prices: { AI_92: 10410, AI_95: 11110, DIESEL: 9710, GAS: 4070 } },
  // Qashqadaryo qo'shimcha
  { id: 'uz-qash-3', name: 'G\'uzor Oil', brand: 'GazOil', city: 'G\'uzor', region: 'Qashqadaryo', address: 'M-39 yo\'li', latitude: 38.6206, longitude: 66.2481, prices: { AI_92: 10435, AI_95: 11135, DIESEL: 9735, GAS: 4095 } },
  // Toshkent qo'shimcha
  { id: 'uz-tash-6', name: 'EcoFuel Olmazor', brand: 'EcoFuel', city: 'Toshkent', region: 'Toshkent', address: 'Olmazor tumani', latitude: 41.3012, longitude: 69.1987, prices: { AI_92: 10400, AI_95: 11100, DIESEL: 9700, GAS: 4150 } },
  { id: 'uz-tash-7', name: 'Turon Oil Yakkasaroy', brand: 'Turon', city: 'Toshkent', region: 'Toshkent', address: 'Yakkasaroy ko\'chasi 45', latitude: 41.2923, longitude: 69.2678, prices: { AI_92: 10520, AI_95: 11220, DIESEL: 9820, GAS: 4180 } },
  { id: 'uz-tash-8', name: 'Petrol Park Mirzo Ulug\'bek', brand: 'UzPetrol', city: 'Toshkent', region: 'Toshkent', address: 'Mirzo Ulug\'bek tumani', latitude: 41.3389, longitude: 69.3345, prices: { AI_92: 10490, AI_95: 11190, DIESEL: 9790, GAS: 4120 } },
  // Qashqadaryo qo'shimcha
  { id: 'uz-qash-4', name: 'Kitob Oil', brand: 'Lukoil', city: 'Kitob', region: 'Qashqadaryo', address: 'Markaz ko\'chasi', latitude: 39.1167, longitude: 66.8833, prices: { AI_92: 10445, AI_95: 11145, DIESEL: 9745, GAS: 4105 } },
  { id: 'uz-qash-5', name: 'Muborak Fuel', brand: 'Neftchi', city: 'Muborak', region: 'Qashqadaryo', address: 'G\'uzor yo\'li', latitude: 39.0889, longitude: 65.1528, prices: { AI_92: 10438, AI_95: 11138, DIESEL: 9738, GAS: 4098 } },
  // Surxondaryo qo'shimcha
  { id: 'uz-sur-3', name: 'Sherobod Oil', brand: 'GazOil', city: 'Sherobod', region: 'Surxondaryo', address: 'Termiz yo\'li', latitude: 37.6683, longitude: 67.7917, prices: { AI_92: 10465, AI_95: 11165, DIESEL: 9765, GAS: 4115 } },
  // Xorazm qo'shimcha
  { id: 'uz-xor-3', name: 'Shovot Fuel', brand: 'Petroline', city: 'Shovot', region: 'Xorazm', address: 'Urganch yo\'li', latitude: 41.6556, longitude: 60.2917, prices: { AI_92: 10485, AI_95: 11185, DIESEL: 9785, GAS: 4135 } },
  // Sirdaryo qo'shimcha
  { id: 'uz-sir-3', name: 'Sirdaryo Oil', brand: 'Lukoil', city: 'Sirdaryo', region: 'Sirdaryo', address: 'Navoiy ko\'chasi', latitude: 40.8436, longitude: 68.6617, prices: { AI_92: 10405, AI_95: 11105, DIESEL: 9705, GAS: 4065 } },
  // Samarqand qo'shimcha
  { id: 'uz-sam-5', name: 'Jomboy Neft', brand: 'GazOil', city: 'Jomboy', region: 'Samarqand', address: 'Samarqand yo\'li', latitude: 39.6989, longitude: 67.0936, prices: { AI_92: 10425, AI_95: 11125, DIESEL: 9725, GAS: 4085 } },
  // Buxoro qo'shimcha
  { id: 'uz-bux-4', name: 'Vobkent Oil', brand: 'Turon', city: 'Vobkent', region: 'Buxoro', address: 'Buxoro yo\'li', latitude: 39.9917, longitude: 64.5153, prices: { AI_92: 10495, AI_95: 11195, DIESEL: 9795, GAS: 4135 } },
  // Qoraqalpog'iston qo'shimcha
  { id: 'uz-qor-4', name: 'Beruniy Fuel', brand: 'Shell', city: 'Beruniy', region: 'Qoraqalpog\'iston', address: 'Markaz ko\'chasi', latitude: 41.6917, longitude: 60.7528, prices: { AI_92: 10540, AI_95: 11240, DIESEL: 9840, GAS: 4170 } },
  // Toshkent viloyati qo'shimcha
  { id: 'uz-tov-5', name: 'Yangiyo\'l Oil', brand: 'UzPetrol', city: 'Yangiyo\'l', region: 'Toshkent viloyati', address: 'Toshkent yo\'li', latitude: 41.1122, longitude: 69.0472, prices: { AI_92: 10415, AI_95: 11115, DIESEL: 9715, GAS: 4075 } },
  ...uzbekistanStationsExtra,
];

function stableFromId(id: string, min: number, max: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  const t = (Math.abs(h) % 1000) / 1000;
  return min + t * (max - min);
}

export function seedToStation(
  seed: StationSeed,
  userLat: number,
  userLng: number,
): Station {
  const distanceKm =
    Math.round(haversineKm(userLat, userLng, seed.latitude, seed.longitude) * 100) / 100;

  return {
    id: seed.id,
    name: seed.name,
    brand: seed.brand,
    address: `${seed.address}, ${seed.city}`,
    latitude: seed.latitude,
    longitude: seed.longitude,
    status: 'OPEN',
    ratingAvg: seed.ratingAvg ?? Math.round((4.2 + stableFromId(seed.id, 0, 0.6)) * 10) / 10,
    ratingCount: Math.floor(stableFromId(seed.id, 5, 85)),
    is24Hours: seed.is24Hours ?? stableFromId(seed.id, 0, 1) > 0.35,
    distanceKm,
    travelTimeMin: estimateTravelMin(distanceKm),
    fuelPrices: (['AI_92', 'AI_95', 'DIESEL', 'GAS'] as FuelType[]).map((ft) => ({
      id: `${seed.id}-${ft}`,
      fuelType: ft,
      pricePerLiter: seed.prices[ft],
      currency: 'UZS',
      isAvailable: seed.prices[ft] > 0,
    })),
  };
}

export const uzbekistanRegions = [
  'Barchasi',
  ...Array.from(new Set(uzbekistanStationSeeds.map((s) => s.region))).sort(),
];
