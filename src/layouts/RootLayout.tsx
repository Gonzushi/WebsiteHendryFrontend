import { Link, NavLink, Outlet } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function RootLayout() {
  const styleLink = clsx(
    "block rounded px-3 py-2 text-lg hover:bg-blue-700 hover:text-white dark:text-white md:bg-transparent md:p-0 md:text-black md:hover:bg-transparent md:hover:text-primary-500 md:dark:text-primary-600",
  );
  return (
    <div>
      <nav className="border-2 border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
          <Link to="/" className="flex items-center space-x-4">
            <SparklesIcon className="h-8 w-8 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Hendry Widyanto
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-2 flex flex-col rounded-xl border-2 border-gray-300 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <NavLink to="/" className={styleLink} aria-current="page">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/portfolio"
                  className={styleLink}
                  aria-current="page"
                >
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={styleLink} aria-current="page">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-screen-xl">
        <Outlet />
      </main>
    </div>
  );
}
