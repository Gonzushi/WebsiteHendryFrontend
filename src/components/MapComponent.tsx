import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster"; // Import as default
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

const TypedMarkerClusterGroup = MarkerClusterGroup as React.ComponentType<any>;

// Define the interface for nested locations
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

// Define the props interface for the map component
interface Props {
  centerLatitude: number;
  centerLongitude: number;
  totalRadiusKm: number;
  locations: NestedLocation[];
}

// Create the MapComponent
const MapComponent: React.FC<Props> = ({
  centerLatitude,
  centerLongitude,
  totalRadiusKm,
  locations,
}) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        () => {
          alert("Unable to retrieve your location.");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Custom icon for the center point (red dot)
  const redDotIcon = L.divIcon({
    className: "red-dot",
    html: '<div style="background-color: red; border-radius: 50%; width: 10px; height: 10px;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  // Custom icon for the user location (blue dot)
  const blueDotIcon = L.divIcon({
    className: "blue-dot",
    html: '<div style="background-color: blue; border-radius: 50%; width: 10px; height: 10px;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  // Custom icon for Alfamart locations
  const alfamartIcon = L.icon({
    iconUrl: "/marker-icon-2x.png", // replace with the actual path to the Alfamart icon image
    iconSize: [17, 28], // size of the icon
    iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      center={[centerLatitude, centerLongitude]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Center circle */}
      <Circle
        center={[centerLatitude, centerLongitude]}
        radius={totalRadiusKm * 1000}
        color="green"
        fillOpacity={0}
      />

      {/* Center point as a red dot */}
      <Marker position={[centerLatitude, centerLongitude]} icon={redDotIcon}>
        <Popup>Center Point</Popup>
      </Marker>

      {/* Alfamart locations with clustering */}
      <TypedMarkerClusterGroup>
        {locations.map((location) => (
          <Marker
            key={location.place_id}
            position={[
              location.geometry.location.lat,
              location.geometry.location.lng,
            ]}
            icon={alfamartIcon}
          >
            <Popup>
              <strong>
                <a
                  href={`https://www.google.com/maps?q=${location.geometry.location.lat},${location.geometry.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {location.name}
                </a>
              </strong>
              <br />
              {location.vicinity}
            </Popup>
          </Marker>
        ))}
      </TypedMarkerClusterGroup>

      {/* Green circles around each Alfamart location */}
      {locations.map((location) => (
        <Circle
          key={location.place_id}
          center={[
            location.geometry.location.lat,
            location.geometry.location.lng,
          ]}
          radius={500} // 500 meters
          color="green"
          fillOpacity={0.1}
        />
      ))}

      {/* User location marker */}
      {userPosition && (
        <Marker position={userPosition} icon={blueDotIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
