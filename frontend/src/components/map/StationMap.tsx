import { UZ_BOUNDS } from "@/lib/geo";
import type { Station } from "@/types";
import { FUEL_LABELS } from "@/types";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const stationIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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

function MapRecenter({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
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
}

export function StationMap({
  stations,
  userLocation,
  height = "480px",
  fitCountry = true,
  followUser = false,
}: StationMapProps) {
  const tileUrl =
    import.meta.env.VITE_MAP_TILE_URL ||
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

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
          <MapRecenter
            lat={userLocation.lat}
            lng={userLocation.lng}
            zoom={12}
          />
        )}

        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={stationIcon}
        >
          <Popup>Sizning joylashuvingiz</Popup>
        </Marker>

        {stations.map((s) => {
          return (
            <Marker
              key={s.id}
              position={[s.latitude, s.longitude]}
              icon={stationIcon}
            >
              <Popup>
                <div className="min-w-[200px] text-sm">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-slate-600">{s.brand}</p>
                  <p className="text-xs text-slate-500">{s.address}</p>
                  <div className="mt-2 space-y-1">
                    {s.fuelPrices?.map((fp) => (
                      <p key={fp.id} className="text-xs">
                        <span className="font-medium text-slate-700">
                          {FUEL_LABELS[fp.fuelType]}:
                        </span>{" "}
                        {fp.pricePerLiter.toLocaleString()} UZS/L
                      </p>
                    ))}
                  </div>
                  {s.distanceKm != null && (
                    <p className="mt-2 text-xs text-slate-500">
                      {s.distanceKm} km
                    </p>
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
