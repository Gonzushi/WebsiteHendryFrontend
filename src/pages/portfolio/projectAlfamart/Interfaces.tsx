export interface NestedLocation {
  business_status: string;
  geometry: {
    location: { lat: number; lng: number };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  name: string;
  place_id: string;
  vicinity: string;
}

export interface MainLocation {
  lat: number;
  lng: number;
  locations: NestedLocation[];
}

export interface Props {
  centerLatitude: number;
  centerLongitude: number;
  totalRadiusKm: number;
  point_radius_m: number;
  alfamartLocations: NestedLocation[];
  indomaretLocations: NestedLocation[];
}

export interface LocationData {
  latitude: number;
  longitude: number;
  phone_number?: string;
  area?: number;
  type?: string;
  price?: number;
  comment?: string;
}
