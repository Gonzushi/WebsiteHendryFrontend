import React, { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet-rotatedmarker";

type RotatableMarkerProps = {
  position: LatLngExpression;
  icon: L.Icon<L.IconOptions>;
  rotationAngle?: number;
  rotationOrigin?: string;
  children: JSX.Element;
};

const RotatableMarker: React.FC<RotatableMarkerProps> = ({
  position,
  icon,
  rotationAngle = 0,
  rotationOrigin = "center",
  children,
}) => {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setRotationAngle(rotationAngle);
      markerRef.current.setRotationOrigin(rotationOrigin);
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker ref={markerRef} position={position} icon={icon}>
      {children}
    </Marker>
  );
};

export default RotatableMarker;
