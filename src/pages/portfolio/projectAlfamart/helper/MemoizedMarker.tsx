import React from "react";
import { Marker, Popup } from "react-leaflet";

const MemoizedMarker: React.FC<{
  position: [number, number];
  icon: L.Icon;
  name: string;
  vicinity: string;
  place_id: string;
}> = React.memo(({ position, icon, name, vicinity, place_id }) => {
  return (
    <Marker key={place_id} position={position} icon={icon}>
      <Popup>
        <strong>
          <a
            href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </strong>
        <br />
        {vicinity}
      </Popup>
    </Marker>
  );
});

export default MemoizedMarker;
