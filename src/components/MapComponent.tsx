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
  alfamartLocations: NestedLocation[];
  indomaretLocations: NestedLocation[];
}

// Create the MapComponent
const MapComponent: React.FC<Props> = ({
  centerLatitude,
  centerLongitude,
  totalRadiusKm,
  alfamartLocations,
  indomaretLocations,
}) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [showAlfamart, setShowAlfamart] = useState(true); // State for Alfamart visibility
  const [showIndomaret, setShowIndomaret] = useState(true); // State for Indomaret visibility
  const [showAlfamartCircles, setShowAlfamartCircles] = useState(true); // State for Alfamart circles visibility
  const [showIndomaretCircles, setShowIndomaretCircles] = useState(true); // State for Indomaret circles visibility

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
    iconUrl: "/alfamart_pin.svg", // replace with the actual path to the Alfamart icon image
    iconSize: [26, 42], // size of the icon
    iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });

  // Custom icon for Indomaret locations
  const indomaretIcon = L.icon({
    iconUrl: "/indomaret_pin.svg", // replace with the actual path to the Indomaret icon image
    iconSize: [26, 42], // size of the icon
    iconAnchor: [12, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 z-20 flex flex-col space-y-2 sm:left-14 sm:top-4 sm:flex-row sm:space-x-2 sm:space-y-0">
        <button
          className={`rounded px-4 py-2 text-white ${showAlfamart ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setShowAlfamart(!showAlfamart)}
        >
          {showAlfamart ? "Alfamart" : "Alfamart"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showAlfamartCircles ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setShowAlfamartCircles(!showAlfamartCircles)}
        >
          {showAlfamartCircles ? "Alfamart O" : "Alfamart O"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showIndomaret ? "bg-red-600" : "bg-gray-400"}`}
          onClick={() => setShowIndomaret(!showIndomaret)}
        >
          {showIndomaret ? "Indomaret" : "Indomaret"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showIndomaretCircles ? "bg-red-600" : "bg-gray-400"}`}
          onClick={() => setShowIndomaretCircles(!showIndomaretCircles)}
        >
          {showIndomaretCircles ? "Indomaret O" : "Indomaret O"}
        </button>
      </div>

      <MapContainer
        center={[centerLatitude, centerLongitude]}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
        className="z-10"
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
        {showAlfamart && (
          <TypedMarkerClusterGroup>
            {alfamartLocations.map((location) => (
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
        )}

        {/* Indomaret locations with clustering */}
        {showIndomaret && (
          <TypedMarkerClusterGroup>
            {indomaretLocations.map((location) => (
              <Marker
                key={location.place_id}
                position={[
                  location.geometry.location.lat,
                  location.geometry.location.lng,
                ]}
                icon={indomaretIcon}
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
        )}

        {/* Green circles around each Alfamart location */}
        {showAlfamartCircles &&
          alfamartLocations.map((location) => (
            <Circle
              key={location.place_id}
              center={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              radius={500} // 500 meters
              color="#0096FF"
              fillOpacity={0.1}
            />
          ))}

        {/* Green circles around each Indomaret location */}
        {showIndomaretCircles &&
          indomaretLocations.map((location) => (
            <Circle
              key={location.place_id}
              center={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              radius={500} // 500 meters
              color="#F76D57"
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
    </div>
  );
};

export default MapComponent;
