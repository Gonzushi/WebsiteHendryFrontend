import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import WebsiteAnalytics from "./pages/portfolio/WebsiteAnalytics";
import AlfamartLocations from "./pages/portfolio/projectAlfamart/AlfamartLocations";
import LocationLog from "./pages/portfolio/LocationLog";
import ProjectCrudHome from "./pages/portfolio/projectCrud/ProjectCrudHome";
import ProjectCrudBrand from "./pages/portfolio/projectCrud/ProjectCrudBrand";
import ProjectCrudProduct from "./pages/portfolio/projectCrud/ProjectCrudProduct";
import LoanCalculator from "./pages/portfolio/projectCalculator/LoanCalculator";
import Bandung from "./pages/portfolio/projectKost/Bandung";
import Jakarta from "./pages/portfolio/projectKost/Jakarta";
import Depok from "./pages/portfolio/projectKost/Depok";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
// import InProgress from "./pages/InProgress";

// layout
import RootLayout from "./layouts/RootLayout";
import PortfolioLayout from "./layouts/PortfolioLayout";
import ProjectCrudLayout from "./layouts/ProjectCrudLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<PortfolioLayout />}>
        <Route index element={<Portfolio />} />
        <Route path="project-crud" element={<ProjectCrudLayout />}>
          <Route index element={<ProjectCrudHome />} />
          <Route path="brand" element={<ProjectCrudBrand />} />
          <Route path="product" element={<ProjectCrudProduct />} />
        </Route>
        <Route path="project-kost/bandung" element={<Bandung />} />
        <Route path="project-kost/jakarta" element={<Jakarta />} />
        <Route path="project-kost/depok" element={<Depok />} />
        <Route path="website-analytics" element={<WebsiteAnalytics />} />
        <Route path="alfamart-locations" element={<AlfamartLocations />} />
        <Route path="location-log" element={<LocationLog />} />
        <Route path="calculator" element={<LoanCalculator />} />
      </Route>
      <Route path="resume" element={<Resume />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default function RouterDOM() {
  return <RouterProvider router={router} />;
}
