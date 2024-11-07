import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Props } from "./helper/Interfaces";
import {
  alfamartIcon,
  indomaretIcon,
  arrowIcon,
  sellIcon,
  greenIcon,
} from "./helper/MapComponentIcon";
import RotatableMarker from "./helper/RotatableMarker";
import ClickHandler from "./helper/ClickHandler";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { RotateMap } from "./helper/RotateMap";
import FormLocation from "./helper/FormLocation";
import MemoizedMarker from "./helper/MemoizedMarker";

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
      className="absolute bottom-8 right-4 rounded-full bg-white p-4 text-left text-white shadow-lg"
      onClick={handleFocus}
      style={{ zIndex: 400 }}
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
  savedLocations,
  setSavedLocations,
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
  const [searchInput, setSearchInput] = useState<string>("");
  const [showSearch, setShowSearch] = useState(false);
  const popupRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  const memoizedAlfamartLocations = useMemo(
    () => alfamartLocations,
    [alfamartLocations],
  );
  const memoizedIndomaretLocations = useMemo(
    () => indomaretLocations,
    [indomaretLocations],
  );

  const MapInitializer: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, []);
    return null;
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const regex = /^\s*\(\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*\)\s*$/;
    const match = searchInput.match(regex);

    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      setAddedPin([lat, lng]);
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], 18);
      }
    } else {
      alert(
        "Please enter a valid coordinate in the format: (latitude, longitude)",
      );
    }
  };

  const clearCache = async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => {
        return caches.delete(cacheName);
      }),
    );
    window.location.reload();
  };

  return (
    <MapContainer
      center={[centerLatitude, centerLongitude]}
      zoom={14}
      className="relative h-full w-full"
    >
      <MapInitializer />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <RotateMap />

      <FocusToUserLocationButton userPosition={userPosition} />

      <ClickHandler setAddedPin={setAddedPin} />

      <Circle
        center={userPosition ? userPosition : [centerLatitude, centerLongitude]}
        radius={totalRadiusKm * 1000}
        color="green"
        fillOpacity={0}
      />

      {/* Search Box */}
      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="absolute bottom-8 left-4 w-full max-w-xs rounded-lg bg-white p-2 shadow-lg sm:bottom-8 sm:left-4 sm:max-w-md"
          style={{ zIndex: 2000 }}
        >
          <div className="mb-2 flex items-center">
            <input
              type="text"
              placeholder="(-6.475683, 106.843919)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded border p-2"
            />
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="ml-2 p-2 text-blue-500"
              title="Clear"
            >
              X
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white"
          >
            Go
          </button>
        </form>
      )}

      {showAlfamart && (
        <TypedMarkerClusterGroup>
          {memoizedAlfamartLocations.map((location) => (
            <MemoizedMarker
              key={location.place_id}
              position={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              icon={alfamartIcon}
              name={location.name}
              vicinity={location.vicinity}
              place_id={location.place_id}
            />
          ))}
        </TypedMarkerClusterGroup>
      )}

      {showIndomaret && (
        <TypedMarkerClusterGroup>
          {memoizedIndomaretLocations.map((location) => (
            <MemoizedMarker
              key={location.place_id}
              position={[
                location.geometry.location.lat,
                location.geometry.location.lng,
              ]}
              icon={indomaretIcon}
              name={location.name}
              vicinity={location.vicinity}
              place_id={location.place_id}
            />
          ))}
        </TypedMarkerClusterGroup>
      )}

      {showAlfamartCircles &&
        memoizedAlfamartLocations.map((location) => (
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
        memoizedIndomaretLocations.map((location) => (
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
            <br />
            Lat: {userPosition[0]}
            <br />
            Lng: {userPosition[1]}
            <br />
            Heading: {heading}
          </Popup>
        </RotatableMarker>
      )}

      {addedPin && (
        <div style={{ zIndex: 1050 }}>
          <Marker position={addedPin} icon={sellIcon}>
            <Popup ref={popupRef}>
              <FormLocation
                pinLocation={addedPin}
                editMode={true}
                setSavedLocations={setSavedLocations}
                setAddedPin={setAddedPin}
              />
            </Popup>
          </Marker>
        </div>
      )}

      <div
        className="absolute right-2 top-2 flex flex-col space-y-2 sm:left-14 sm:top-4 sm:flex-row sm:space-x-2 sm:space-y-0"
        style={{ zIndex: 400 }}
      >
        <button
          className={`rounded px-4 py-2 text-white ${showAlfamart ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setShowAlfamart(!showAlfamart)}
        >
          {showAlfamart ? "Alfa" : "Alfa"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showAlfamartCircles ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setShowAlfamartCircles(!showAlfamartCircles)}
        >
          {showAlfamartCircles ? "Alfa O" : "Alfa O"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showIndomaret ? "bg-red-600" : "bg-gray-400"}`}
          onClick={() => setShowIndomaret(!showIndomaret)}
        >
          {showIndomaret ? "Indo" : "Indo"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showIndomaretCircles ? "bg-red-600" : "bg-gray-400"}`}
          onClick={() => setShowIndomaretCircles(!showIndomaretCircles)}
        >
          {showIndomaretCircles ? "Indo O" : "Indo O"}
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${showSearch ? "bg-blue-600" : "bg-gray-400"}`}
          onClick={() => setShowSearch(!showSearch)}
        >
          {!showSearch ? "Search" : "Search"}
        </button>
        <button
          className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700`}
          onClick={clearCache}
        >
          Clear
        </button>
      </div>

      {/* Add Saved Location Pin */}
      {savedLocations &&
        savedLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={greenIcon}
          >
            <Popup>
              <FormLocation
                pinLocation={[location.latitude, location.longitude]}
                location={location}
                editMode={false}
                setSavedLocations={setSavedLocations}
                setAddedPin={setAddedPin}
              />
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
