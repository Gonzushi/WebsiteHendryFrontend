import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Props } from "./Interfaces";
import {
  alfamartIcon,
  indomaretIcon,
  arrowIcon,
  sellIcon,
} from "./MapComponentIcon";
import RotatableMarker from "./RotatableMarker";
import ClickHandler from "./ClickHandler";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { RotateControl, RotateMap } from "./RotateMap";

const TypedMarkerClusterGroup = MarkerClusterGroup as React.ComponentType<any>;

const FocusToUserLocationButton: React.FC<{
  userPosition: [number, number] | null;
}> = ({ userPosition }) => {
  const map = useMap();

  const handleFocus = () => {
    if (userPosition) {
      map.setView(userPosition, 18);
    }
  };

  return (
    <button
      className="absolute bottom-24 right-4 z-50 rounded-full bg-white p-4 text-left text-white shadow-lg"
      onClick={handleFocus}
      style={{ zIndex: 1000 }} // Ensure high z-index
    >
      <img src="/arrow.svg" alt="arrow" className="h-8 w-8 rotate-90" />
    </button>
  );
};

const MapComponent: React.FC<Props> = ({
  centerLatitude,
  centerLongitude,
  totalRadiusKm,
  point_radius_m,
  alfamartLocations,
  indomaretLocations,
}) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [heading, setHeading] = useState<number | null>(null);
  const [showAlfamart, setShowAlfamart] = useState(false);
  const [showIndomaret, setShowIndomaret] = useState(false);
  const [showAlfamartCircles, setShowAlfamartCircles] = useState(false);
  const [showIndomaretCircles, setShowIndomaretCircles] = useState(false);
  const [addedPin, setAddedPin] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;
          setUserPosition([latitude, longitude]);
          if (heading !== null) setHeading(heading);
        },
        () => {
          // alert("Unable to retrieve your location.");
        },
        { enableHighAccuracy: true },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

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
        className="relative z-10"
        touchZoom={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <RotateMap />

        <RotateControl />

        <FocusToUserLocationButton userPosition={userPosition} />

        <ClickHandler setAddedPin={setAddedPin} />

        <Circle
          center={
            userPosition ? userPosition : [centerLatitude, centerLongitude]
          }
          radius={totalRadiusKm * 1000}
          color="green"
          fillOpacity={0}
        />

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

        {showAlfamartCircles &&
          alfamartLocations.map((location) => (
            <Circle
              key={location.place_id}
              center={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              radius={point_radius_m}
              color="#0096FF"
              fillOpacity={0.1}
            />
          ))}

        {showIndomaretCircles &&
          indomaretLocations.map((location) => (
            <Circle
              key={location.place_id}
              center={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              radius={point_radius_m}
              color="#F76D57"
              fillOpacity={0.1}
            />
          ))}

        {userPosition && (
          <RotatableMarker
            position={userPosition}
            icon={arrowIcon}
            rotationAngle={heading ?? 0}
            rotationOrigin="center"
          >
            <Popup>
              <a
                href={`https://www.google.com/maps?q=${userPosition[0]},${userPosition[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Location
              </a>
            </Popup>
          </RotatableMarker>
        )}

        {addedPin && (
          <Marker position={addedPin} icon={sellIcon}>
            <Popup>
              <a
                href={`https://www.google.com/maps?q=${addedPin[0]},${addedPin[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                New Pin
              </a>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
