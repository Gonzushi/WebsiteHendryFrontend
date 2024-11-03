import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "HW App",
        short_name: "HW",
        description: "An application for Hendry Widyanto",
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
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
