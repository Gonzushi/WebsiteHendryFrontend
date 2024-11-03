import React from "react";
import MapComponent from "./MapComponent";
import AlafamartLocationsJson from "../../../data/alfamart_locations_fix.json";
import IndomaretLocationsJson from "../../../data/indomaret_locations_fix.json";
import { NestedLocation, MainLocation } from "./Interfaces";

const AlfamartLocations: React.FC = () => {
  const centerLatitude = -6.4730792;
  const centerLongitude = 106.8448007;
  const totalRadiusKm = 100;
  const point_radius_m = 300;
  const alfamartLocations: MainLocation[] =
    AlafamartLocationsJson as MainLocation[];
  const indomarettLocations: MainLocation[] =
    IndomaretLocationsJson as MainLocation[];

  const allAlfamartLocations: NestedLocation[] = [];
  const allIndomaretLocations: NestedLocation[] = [];

  alfamartLocations.forEach((entry) => {
    const locations = entry.locations;
    if (locations) {
      allAlfamartLocations.push(...locations);
    }
  });

  indomarettLocations.forEach((entry) => {
    const locations = entry.locations;
    if (locations) {
      allIndomaretLocations.push(...locations);
    }
  });

  const uniqueAlfamartLocations = Array.from(
    new Map(
      allAlfamartLocations.map((location) => [location.place_id, location]),
    ).values(),
  );

  const uniqueIndomaretLocations = Array.from(
    new Map(
      allIndomaretLocations.map((location) => [location.place_id, location]),
    ).values(),
  );

  return (
    <div className="fixed inset-0 z-50">
      <MapComponent
        centerLatitude={centerLatitude}
        centerLongitude={centerLongitude}
        totalRadiusKm={totalRadiusKm}
        point_radius_m={point_radius_m}
        alfamartLocations={uniqueAlfamartLocations}
        indomaretLocations={uniqueIndomaretLocations}
      />
    </div>
  );
};

export default AlfamartLocations;
