import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Configure Workbox options here
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,json}"],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // Set to 50 MB or another limit as needed
      },
    }),
    react(),
  ],
  server: {
    host: "0.0.0.0", // Allow access from any device
    port: 3000, // Change the port if needed
  },
});
