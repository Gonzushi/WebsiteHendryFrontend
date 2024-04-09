import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
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
