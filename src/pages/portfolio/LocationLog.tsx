import { useState } from "react";
import { Map, Marker } from "react-map-gl";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function LocationLog() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<any>();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        showError(error);
      },
    );
  };

  const showError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
    }
  };

  return (
    <div className="m-4">
      <button
        className="rounded-lg border border-gray-200 p-4 hover:bg-primary-600 hover:text-white"
        onClick={() => getLocation()}
      >
        Get Location
      </button>
      {location && (
        <div>
          <p>Error: {String(error)}</p>
          <p>Latitude: {location.coords.latitude}</p>
          <p>Longitude: {location.coords.longitude}</p>
          <p>
            {location.coords.latitude}, {location.coords.longitude}
          </p>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-300 shadow-lg">
        <Map
          mapboxAccessToken="pk.eyJ1IjoiaGVuZHJ5d2lkeWFudG8iLCJhIjoiY2x2aDhhNXl5MHc2YzJvbzF3M3liOHY2NiJ9.6Z29oynUALXdbYqXT_z84w"
          initialViewState={{
            longitude: 106.8229,
            latitude: -6.1944,
            zoom: 3.5,
          }}
          style={{ height: 400 }}
          mapStyle="mapbox://styles/mapbox/light-v11"
        >
          {location != null && (
            <Marker
              latitude={location.coords.latitude}
              longitude={location.coords.longitude}
              anchor="bottom"
            >
              <div className="marker">
                <MapPinIcon className="h-4 w-4 text-primary-600" />
              </div>
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
}
