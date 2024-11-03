import L from "leaflet";

export const redDotIcon = L.divIcon({
  className: "red-dot",
  html: '<div style="background-color: red; border-radius: 50%; width: 10px; height: 10px;"></div>',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export const blueDotIcon = L.divIcon({
  className: "blue-dot",
  html: '<div style="background-color: blue; border-radius: 50%; width: 10px; height: 10px;"></div>',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export const sellIcon = L.icon({
    iconUrl: "/sell_pin.svg", 
    iconSize: [26, 42],
    iconAnchor: [12, 25], 
    popupAnchor: [0, -20], 
  });

export const alfamartIcon = L.icon({
  iconUrl: "/alfamart_pin.svg", 
  iconSize: [26, 42],
  iconAnchor: [12, 25], 
  popupAnchor: [0, -20], 
});

export const indomaretIcon = L.icon({
  iconUrl: "/indomaret_pin.svg", 
  iconSize: [26, 42],
  iconAnchor: [12, 25], 
  popupAnchor: [0, -20], 
});

export const arrowIcon = L.icon({
    iconUrl: "/arrow.svg",
    iconSize: [26, 42],
    iconAnchor: [12, 25], 
    popupAnchor: [0, -20],
  });
  