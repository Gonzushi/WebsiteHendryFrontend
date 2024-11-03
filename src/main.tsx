import React from "react";
import ReactDOM from "react-dom/client";
import RouterDOM from "./router";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope,
        );
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed: ", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterDOM />
  </React.StrictMode>,
);
