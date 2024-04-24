import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  const [statusGA, setStatusGA] = useState(false);
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
    setStatusGA(true);
  }, [location]);

  return (
    <div>
      <ScrollRestoration />

      <div className="text-center font-semibold">
        {location.pathname + location.search + " " + statusGA}
      </div>

      <Navbar />

      <main className="container mx-auto min-h-96 max-w-screen-xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
