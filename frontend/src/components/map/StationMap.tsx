import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Plus, Minus, Crosshair, MapPin } from 'lucide-react';
import type { Station } from '@/types';
import { UZ_BOUNDS } from '@/lib/geo';
import { FUEL_LABELS } from '@/types';
import type { FuelType } from '@/types';

const DARK_TILES =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

function stationMarkerHtml(selected: boolean, dimmed: boolean, isNearest: boolean) {
  const cls = [
    'fuelgo-pin',
    selected ? 'fuelgo-pin--active' : '',
    isNearest ? 'fuelgo-pin--nearest' : '',
    dimmed ? 'fuelgo-pin--dim' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return `<div class="${cls}"><div class="fuelgo-pin__glow"></div><div class="fuelgo-pin__body"><span class="fuelgo-pin__dot"></span></div></div>`;
}

function createStationIcon(selected: boolean, dimmed: boolean, isNearest: boolean) {
  return L.divIcon({
    className: 'fuelgo-marker-icon',
    html: stationMarkerHtml(selected, dimmed, isNearest),
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -40],
  });
}

const userIcon = L.divIcon({
  className: 'fuelgo-user-icon',
  html: `<div class="fuelgo-user"><span></span></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function FitStationsBounds({
  stations,
  selectedRegion,
  fitTrigger,
}: {
  stations: Station[];
  selectedRegion: string;
  fitTrigger: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (stations.length === 0) {
      map.fitBounds(
        [
          [UZ_BOUNDS.south, UZ_BOUNDS.west],
          [UZ_BOUNDS.north, UZ_BOUNDS.east],
        ],
        { padding: [32, 32], maxZoom: 7 },
      );
      return;
    }

    if (stations.length === 1) {
      map.setView([stations[0].latitude, stations[0].longitude], 12, { animate: true });
      return;
    }

    const bounds = L.latLngBounds(
      stations.map((s) => [s.latitude, s.longitude] as [number, number]),
    );
    const maxZoom = selectedRegion === 'Barchasi' ? 7 : 11;
    map.fitBounds(bounds, { padding: [48, 48], maxZoom, animate: true });
  }, [map, selectedRegion, fitTrigger, stations.length]);

  return null;
}

function MapControls({
  onLocate,
  userLat,
  userLng,
}: {
  onLocate: () => void;
  userLat: number;
  userLng: number;
}) {
  const map = useMap();

  return (
    <div className="fuelgo-map-controls">
      <button
        type="button"
        aria-label="Mening joyim"
        onClick={() => {
          onLocate();
          map.setView([userLat, userLng], 12, { animate: true });
        }}
      >
        <Crosshair className="h-5 w-5" />
      </button>
      <button type="button" aria-label="Kattalashtirish" onClick={() => map.zoomIn()}>
        <Plus className="h-5 w-5" />
      </button>
      <button type="button" aria-label="Kichiklashtirish" onClick={() => map.zoomOut()}>
        <Minus className="h-5 w-5" />
      </button>
    </div>
  );
}

interface StationMapProps {
  stations: Station[];
  nearestStationIds: Set<string>;
  userLocation: { lat: number; lng: number };
  selectedStationId?: string | null;
  selectedRegion?: string;
  selectedFuel?: FuelType;
  mapVersion?: number;
  fitTrigger?: number;
  totalExpected?: number;
  height?: string;
  onLocate?: () => void;
  onStationClick?: (station: Station) => void;
}

export function StationMap({
  stations,
  nearestStationIds,
  userLocation,
  selectedStationId,
  selectedRegion = 'Barchasi',
  selectedFuel = 'AI_95',
  mapVersion = 0,
  fitTrigger = 0,
  totalExpected = 0,
  height = '520px',
  onLocate,
  onStationClick,
}: StationMapProps) {
  const routeLines = useMemo(() => {
    return [...stations]
      .filter((s) => nearestStationIds.has(s.id))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
      .slice(0, 5)
      .map((s) => [
        [userLocation.lat, userLocation.lng] as [number, number],
        [s.latitude, s.longitude] as [number, number],
      ]);
  }, [stations, nearestStationIds, userLocation]);

  const nearestTop = useMemo(() => {
    return [...stations]
      .filter((s) => nearestStationIds.has(s.id))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))[0];
  }, [stations, nearestStationIds]);

  return (
    <div className="fuelgo-map-wrap relative" style={{ height }}>
      {stations.length > 0 && (
        <div className="fuelgo-map-badge">
          <MapPin className="h-3.5 w-3.5" />
          {stations.length}
          {totalExpected > 0 && selectedRegion === 'Barchasi' ? ` / ${totalExpected}` : ''} AZS
        </div>
      )}
      {nearestTop && (
        <div className="fuelgo-map-nearest-hint">
          Eng yaqin: <strong>{nearestTop.name}</strong> · {nearestTop.distanceKm} km
        </div>
      )}

      <MapContainer
        center={[UZ_BOUNDS.center.lat, UZ_BOUNDS.center.lng]}
        zoom={6}
        className="fuelgo-map"
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          url={DARK_TILES}
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitStationsBounds
          stations={stations}
          selectedRegion={selectedRegion}
          fitTrigger={fitTrigger}
        />

        {routeLines.map((positions, i) => (
          <Polyline
            key={`route-${selectedFuel}-${i}-${mapVersion}`}
            positions={positions}
            pathOptions={{
              color: i === 0 ? '#3b82f6' : '#f59e0b',
              weight: i === 0 ? 4 : 2,
              opacity: 0.9,
              dashArray: i === 0 ? undefined : '8 8',
            }}
          />
        ))}

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} zIndexOffset={1000}>
          <Popup>Sizning joylashuvingiz</Popup>
        </Marker>

        {stations.map((s) => {
          const price = s.fuelPrices?.find((p) => p.fuelType === selectedFuel && p.isAvailable);
          const isSelected = s.id === selectedStationId;
          const isNearest = nearestStationIds.has(s.id);
          const dimmed = !price;
          return (
            <Marker
              key={`${s.id}-${selectedFuel}-v${mapVersion}`}
              position={[s.latitude, s.longitude]}
              icon={createStationIcon(isSelected, dimmed, isNearest)}
              zIndexOffset={isNearest ? 500 : isSelected ? 600 : 0}
              eventHandlers={{
                click: () => onStationClick?.(s),
              }}
            >
              <Popup className="fuelgo-popup">
                {isNearest && (
                  <span className="mb-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                    Sizga yaqin
                  </span>
                )}
                <p className="font-semibold text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-600">{s.brand}</p>
                <p className="text-xs text-slate-500">{s.address}</p>
                {price ? (
                  <p className="mt-1 text-sm font-bold text-amber-600">
                    {FUEL_LABELS[selectedFuel]}: {price.pricePerLiter.toLocaleString()} UZS/L
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">
                    {FUEL_LABELS[selectedFuel]} mavjud emas
                  </p>
                )}
                {s.distanceKm != null && (
                  <p className="text-xs text-slate-500">{s.distanceKm} km · ~{s.travelTimeMin} min</p>
                )}
              </Popup>
            </Marker>
          );
        })}

        {onLocate && (
          <MapControls
            onLocate={onLocate}
            userLat={userLocation.lat}
            userLng={userLocation.lng}
          />
        )}
      </MapContainer>
    </div>
  );
}
