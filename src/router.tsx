import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// layout
import RootLayout from "./layouts/RootLayout";
import PortfolioLayout from "./layouts/PortfolioLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<PortfolioLayout />}>
        <Route path="trial" element={<Portfolio />} />
      </Route>
      <Route path="resume" element={<Resume />} />
      <Route path="contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default function RouterDOM() {
  return <RouterProvider router={router} />;
}
