import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  // console.log(location)
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <div>
      <ScrollRestoration />

      <div className="text-center font-semibold">{location.pathname + location.search}</div>

      <Navbar />

      <main className="container mx-auto min-h-96 max-w-screen-xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
