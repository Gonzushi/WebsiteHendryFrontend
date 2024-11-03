import "leaflet";

declare module "leaflet" {
  interface Map {
    setBearing(bearing: number): void;
    getBearing(): number; // Add this line to declare the method
  }
}
