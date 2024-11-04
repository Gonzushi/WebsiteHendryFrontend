import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-rotate";

export const RotateMap = () => {
  const map = useMap();
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const [touch1, touch2] = e.touches;
        const initialAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX,
        );

        const handleTouchMove = (e: TouchEvent) => {
          if (e.touches.length === 2) {
            const [newTouch1, newTouch2] = e.touches;
            const newAngle = Math.atan2(
              newTouch2.clientY - newTouch1.clientY,
              newTouch2.clientX - newTouch1.clientX,
            );
            const deltaAngle = (newAngle - initialAngle) * (180 / Math.PI);
            const newAngleDegrees = angle + deltaAngle;

            map.setBearing(newAngleDegrees);
            setAngle(newAngleDegrees);

            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
          }
        };

        const handleTouchEnd = () => {
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchEnd);
        };

        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [map, angle]);

  return null;
};

export const RotateControl = () => {
  const map = useMap();

  const rotateLeft = () => {
    map.setBearing(map.getBearing() - 15);
  };

  const rotateRight = () => {
    map.setBearing(map.getBearing() + 15);
  };

  return (
    <div className="absolute right-2 top-2 space-x-2 sm:top-2 sm:right-8" style={{ zIndex: 2000 }}>
      <button
        onClick={rotateLeft}
        className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-blue-600"
      >
        Rotate Left
      </button>
      <button
        onClick={rotateRight}
        className="rounded-md bg-green-500 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-green-600"
      >
        Rotate Right
      </button>
    </div>
  );
};
