// App.tsx
import React from "react";
import MapComponent from "../../components/MapComponent";
import AlafamartLocationsJson from "../../data/alfamart_locations_fix.json";
import { NestedLocation } from "../../components/MapComponent";

// Define the interface for main locations
export interface MainLocation {
  lat: number;
  lng: number;
  locations: NestedLocation[];
}

const AlfamartLocations: React.FC = () => {
  const centerLatitude = -6.4730792;
  const centerLongitude = 106.8448007;
  const totalRadiusKm = 100;
  const locations: MainLocation[] = AlafamartLocationsJson as MainLocation[];

  const allLocations: NestedLocation[] = [];
  locations.forEach((entry) => {
    const locations = entry.locations;
    if (locations) {
      allLocations.push(...locations);
    }
  });

  const uniqueLocations = Array.from(
    new Map(
      allLocations.map((location) => [location.place_id, location]),
    ).values(),
  );

  console.log(uniqueLocations.length)

  return (
    <div>
      <MapComponent
        centerLatitude={centerLatitude}
        centerLongitude={centerLongitude}
        totalRadiusKm={totalRadiusKm}
        locations={uniqueLocations}
      />
    </div>
  );
};

export default AlfamartLocations;
