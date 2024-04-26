import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pageView from "../utilites/analytic"

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    pageView(location);
  }, [location]);

  return (
    <div>
      <ScrollRestoration />

      <Navbar />

      <main className="container mx-auto min-h-96 max-w-screen-xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
