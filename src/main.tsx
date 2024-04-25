import React from "react";
import ReactDOM from "react-dom/client";
import RouterDOM from "./router";
import "./index.css";

// import ReactGA from "react-ga4";
// ReactGA.initialize("G-07QF48SE6H");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterDOM />,
  </React.StrictMode>,
);
