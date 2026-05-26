export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function estimateTravelMin(distanceKm: number, speedKmh = 55): number {
  return Math.round((distanceKm / speedKmh) * 60);
}

/** O'zbekiston chegaralari (xarita uchun) */
export const UZ_BOUNDS = {
  south: 37.0,
  north: 45.6,
  west: 56.0,
  east: 73.2,
  center: { lat: 41.3775, lng: 64.5853 },
};
