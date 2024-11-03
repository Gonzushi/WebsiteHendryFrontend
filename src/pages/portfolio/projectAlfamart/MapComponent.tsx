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
import { useForm } from "react-hook-form";
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
      className="absolute bottom-24 right-4 rounded-full bg-white p-4 text-left text-white shadow-lg"
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
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      latitude: addedPin ? addedPin[0] : null,
      longitude: addedPin ? addedPin[1] : null,
    };
    console.log("Submitted Data:", formData);
    reset();
    setAddedPin(null);
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

  return (
    <MapContainer
      center={[centerLatitude, centerLongitude]}
      zoom={14}
      className="relative h-full w-full"
    >
      <div
        className="absolute right-2 top-2 flex flex-col space-y-2 sm:left-14 sm:top-4 sm:flex-row sm:space-x-2 sm:space-y-0"
        style={{ zIndex: 400 }}
      >
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

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <RotateMap />

      <RotateControl />

      <FocusToUserLocationButton userPosition={userPosition} />

      <ClickHandler setAddedPin={setAddedPin} />

      <Circle
        center={userPosition ? userPosition : [centerLatitude, centerLongitude]}
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
            <Popup>
              <a
                href={`https://www.google.com/maps?q=${addedPin[0]},${addedPin[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl font-medium text-gray-700"
              >
                Location
              </a>
              <div className="relative">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 w-64"
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      type="number"
                      {...register("phoneNumber", {})}
                      className="mt-1 block h-10 w-full rounded-md border-2 border-gray-300 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Area:
                    </label>
                    <input
                      type="number"
                      {...register("area", {
                        setValueAs: (value) => Number(value),
                      })}
                      className="mt-1 block h-10 w-full rounded-md border-2 border-gray-300 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Type:
                    </label>
                    <select
                      {...register("type")}
                      style={{
                        WebkitAppearance: "none",
                        appearance: "none",
                        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"%3E%3Cpath fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /%3E%3C/svg%3E')`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1em",
                      }}
                      className="mt-1 block h-10 w-full rounded-md border-2 border-gray-300 bg-white px-3 pr-8 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Gudang">Gudang</option>
                      <option value="Rumah">Rumah</option>
                      <option value="Ruko">Ruko</option>
                      <option value="Tanah">Tanah</option>
                      <option value="Toko">Toko</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Price:
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        Rp.
                      </span>
                      <input
                        type="text"
                        {...register("price", {
                          validate: (value) => {
                            const cleanValue =
                              typeof value === "string"
                                ? value.replace(/,/g, "")
                                : value;
                            return !isNaN(cleanValue) || "Invalid number";
                          },
                          setValueAs: (value) =>
                            typeof value === "string"
                              ? Number(value.replace(/,/g, ""))
                              : value,
                        })}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                          const formattedValue = new Intl.NumberFormat().format(
                            Number(rawValue),
                          );
                          e.target.value = formattedValue;
                        }}
                        className="mt-1 block h-10 w-full rounded-md border-2 border-gray-300 px-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Comment:
                    </label>
                    <textarea
                      {...register("comment")}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your comments here"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Popup>
          </Marker>
        </div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
