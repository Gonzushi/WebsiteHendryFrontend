import { Link } from "react-router-dom";
import IconWip from "../assetts/icons/IconWip";
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

            <Link to="#" className="bg-gray-100">
              <div className="items-center rounded-lg border border-gray-300 px-4 py-4 shadow-md  hover:shadow-lg sm:flex">
                <div className="mx-auto size-48 min-w-48 rounded-lg border-2 border-gray-200 py-14 shadow-md">
                  <IconWip />
                  <p className="text-center font-bold">Work in Progress</p>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-90 text-xl font-bold tracking-tight">
                    Placeholder
                  </h3>
                  <span className="text-gray-500">Lorem ipsum dolor sit.</span>
                  <p className="mb-4 mt-3 font-normal text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    blanditiis culpa dolore?
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
