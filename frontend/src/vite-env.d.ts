/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCK_DATA: string;
  readonly VITE_DEMO_MODE: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TAGLINE: string;
  readonly VITE_DEFAULT_LAT: string;
  readonly VITE_DEFAULT_LNG: string;
  readonly VITE_MAP_TILE_URL: string;
  readonly VITE_MAP_ATTRIBUTION: string;
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_ENABLE_DELIVERY: string;
  readonly VITE_ENABLE_FLEET_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
