import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Your App Name",
        short_name: "App Name",
        description: "A brief description of your app.",
        theme_color: "#317EFB",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Configure Workbox options here
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,json}"],
      },
    }),
    react(),
  ],
  server: {
    host: "0.0.0.0", // Allow access from any device
    port: 3000, // Change the port if needed
  },
});
