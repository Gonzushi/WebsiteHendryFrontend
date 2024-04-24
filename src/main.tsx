import React from "react";
import ReactDOM from "react-dom/client";
import RouterDOM from "./router";
// import ReactGA from 'react-ga'
import "./index.css";

// ReactGA.initialize('G-07QF48SE6H');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterDOM />,
  </React.StrictMode>,
);
