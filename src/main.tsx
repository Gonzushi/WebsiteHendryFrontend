import React from "react";
import ReactDOM from "react-dom/client";
import RouterDOM from "./router";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterDOM />
  </React.StrictMode>,
);
