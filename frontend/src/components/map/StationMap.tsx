import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Station } from '@/types';
import { UZ_BOUNDS } from '@/lib/geo';
import { FUEL_LABELS } from '@/types';

const stationIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FitUzbekistanBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(
      [
        [UZ_BOUNDS.south, UZ_BOUNDS.west],
        [UZ_BOUNDS.north, UZ_BOUNDS.east],
      ],
      { padding: [24, 24] },
    );
  }, [map]);
  return null;
}

function MapRecenter({ lat, lng, zoom }: { lat: number; lng: number; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (zoom) map.setView([lat, lng], zoom);
    else map.setView([lat, lng], map.getZoom());
  }, [lat, lng, zoom, map]);
  return null;
}

interface StationMapProps {
  stations: Station[];
  userLocation: { lat: number; lng: number };
  height?: string;
  fitCountry?: boolean;
  followUser?: boolean;
  selectedFuel?: string;
}

export function StationMap({
  stations,
  userLocation,
  height = '480px',
  fitCountry = true,
  followUser = false,
  selectedFuel = 'AI_95',
}: StationMapProps) {
  const tileUrl =
    import.meta.env.VITE_MAP_TILE_URL ||
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div
      style={{ height }}
      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"
    >
      <MapContainer
        center={[UZ_BOUNDS.center.lat, UZ_BOUNDS.center.lng]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer url={tileUrl} attribution="© OpenStreetMap" />
        {fitCountry && !followUser && <FitUzbekistanBounds />}
        {followUser && (
          <MapRecenter lat={userLocation.lat} lng={userLocation.lng} zoom={12} />
        )}

        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Sizning joylashuvingiz</Popup>
        </Marker>

        {stations.map((s) => {
          const price = s.fuelPrices?.find((p) => p.fuelType === selectedFuel);
          return (
            <Marker
              key={s.id}
              position={[s.latitude, s.longitude]}
              icon={stationIcon}
            >
              <Popup>
                <div className="min-w-[160px] text-sm">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-slate-600">{s.brand}</p>
                  <p className="text-xs text-slate-500">{s.address}</p>
                  {price && (
                    <p className="mt-1 font-bold text-amber-700">
                      {FUEL_LABELS[selectedFuel as keyof typeof FUEL_LABELS]}:{' '}
                      {price.pricePerLiter.toLocaleString()} UZS/L
                    </p>
                  )}
                  {s.distanceKm != null && (
                    <p className="text-xs text-slate-500">{s.distanceKm} km</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
