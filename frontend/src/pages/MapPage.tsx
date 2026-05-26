import { FuelTypeSelector } from "@/components/FuelTypeSelector";
import { StationMap } from "@/components/map/StationMap";
import { StationCard } from "@/components/StationCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { uzbekistanRegions } from "@/data/uzbekistanStations";
import { useMapStore } from "@/store/mapStore";
import { Navigation, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export function MapPage() {
  const {
    stations,
    allStations,
    userLocation,
    selectedFuel,
    selectedStation,
    selectedRegion,
    isLoading,
    setSelectedFuel,
    setSelectedStation,
    setSelectedRegion,
    detectLocation,
    fetchNearby,
  } = useMapStore();

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const displayList = stations.slice(0, 15);
  const totalCount = allStations.length || stations.length;

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-[#050505] lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              O&apos;zbekiston xaritasi
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {totalCount} ta AZS — barcha viloyatlar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                try {
                  await detectLocation();
                  await fetchNearby();
                } catch {
                  alert("Joylashuv ruxsati berilmadi");
                }
              }}
            >
              <Navigation className="h-4 w-4" />
              Mening joyim
            </Button>
            <Button size="sm" onClick={fetchNearby} disabled={isLoading}>
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Yangilash
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FuelTypeSelector value={selectedFuel} onChange={setSelectedFuel} />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {uzbekistanRegions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <StationMap
              stations={stations}
              userLocation={userLocation}
              height="520px"
              fitCountry={selectedRegion === "Barchasi"}
              followUser={selectedRegion !== "Barchasi"}
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Eng yaqin stansiyalar
            </p>
            {displayList.map((s) => (
              <StationCard
                key={s.id}
                station={s}
                price={
                  s.fuelPrices?.find((p) => p.fuelType === selectedFuel)
                    ? {
                        pricePerLiter: s.fuelPrices!.find(
                          (p) => p.fuelType === selectedFuel,
                        )!.pricePerLiter,
                        currency: "UZS",
                        fuelType: selectedFuel,
                      }
                    : undefined
                }
                distanceKm={s.distanceKm}
                travelTimeMin={s.travelTimeMin}
                onClick={() => setSelectedStation(s)}
              />
            ))}
            {selectedStation && <StationCard station={selectedStation} />}
          </div>
        </div>
      </div>
    </div>
  );
}
