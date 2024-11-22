import { Link } from "react-router-dom";
import CrudLogo from "../assetts/crud_application.jpg";
import WebsiteAnalyticsLogo from "../assetts/website_analytics.jpg";

export default function Portfolio() {
  return (
    <div className="max-w-screen-xl">
      <section className="bg-white">
        <div className="mx-auto px-4 py-8 lg:px-6 lg:py-10 ">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              My Personal Projects
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
              Explore the collection of my personal projects. Learn new stuff
              everyday!
            </p>
          </div>

          <div className="mb-6 grid gap-8 md:grid-cols-2 lg:mb-16">
            <Link to="project-crud">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={CrudLogo}
                    alt="crud_logo"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    CRUD Operation
                  </h3>
                  <span className="text-gray-500">FastAPI, SQL Server</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    This project is to build an API and relational database
                    using FastAPI and SQL Alchemy to perform CRUD operation.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="website-analytics">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="website_analytics"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Website Analytics
                  </h3>
                  <span className="text-gray-500">FastAPI, SQL Server</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    This project is to build an application to collect the
                    analytic of a website. In this case, I applied it for this
                    site.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="alfamart-locations">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Alfmart"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Alfamart Locations
                  </h3>
                  <span className="text-gray-500">Google Places API</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    This project is to list all Alfamarts locations. The purpose
                    is to find potential locations for Alfamart.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="calculator">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Loan Calculator"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Loan Calculator
                  </h3>
                  <span className="text-gray-500">Simple Math</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    This project is to calculate progressive installment of a
                    loan. Very simple.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="project-kost/bandung">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Kost di Bandung"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Kost di Bandung
                  </h3>
                  <span className="text-gray-500">Scrapping Rumah 123</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    To check kost that is being sold in Bandung. To get some insight.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="project-kost/jakarta">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Kost di Jakarta"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Kost di Jakarta
                  </h3>
                  <span className="text-gray-500">Scrapping Rumah 123</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    To check kost that is being sold in Jakarta. To get some insight.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="project-kost/depok">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Kost di Depok"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Kost di Depok
                  </h3>
                  <span className="text-gray-500">Scrapping Rumah 123</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    To check kost that is being sold in Depok. To get some insight.
                  </p>
                </div>
              </div>
            </Link>

            <Link to="project-kost/rumah123">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="relative mx-auto size-48 min-w-48 overflow-hidden rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <img
                    src={WebsiteAnalyticsLogo}
                    alt="Semua Kost"
                    className="absolute top-0 mx-auto"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Scrapping Rumah 123 
                  </h3>
                  <span className="text-gray-500">Scrapping Rumah 123</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    To check kost that is being sold with a given specification. To get some insight.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
