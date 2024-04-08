import { Link, NavLink, Outlet } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function RootLayout() {
  const styleLink = clsx(
    "block rounded px-3 py-2 text-lg hover:bg-blue-700 hover:text-white dark:text-white md:bg-transparent md:p-0 md:text-black md:hover:bg-transparent md:hover:text-primary-500 md:dark:text-primary-600",
  );

  const year = new Date().getFullYear();

  return (
    <div>
      <nav className="border-b-2 border-gray-200 bg-white dark:bg-gray-900">
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
            <Bars3Icon className="h-10 w-10 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-xl border-2 border-gray-300 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
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

      <main className="container mx-auto min-h-80 max-w-screen-xl">
        <Outlet />
      </main>

      <footer className="container mx-auto mt-12 max-w-screen-xl bg-white p-4 dark:bg-gray-800 md:p-8 lg:p-10">
        <div className="mx-auto text-center">
          <Link
            to="/"
            className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <SparklesIcon className="me-2 h-8 w-8 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
            Hendry
          </Link>
          <p className="my-6 text-gray-500 dark:text-gray-400">
            The capacity to learn is a gift; the ability to learn is a skill;
            the willingness to learn is a choice
          </p>
          <ul className="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
            <li>
              <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="mr-4 hover:underline md:mr-6 ">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="mr-4 hover:underline md:mr-6 ">
                Contact
              </Link>
            </li>
          </ul>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © {year}{" "}
            <a href="#" className="hover:underline">
              Hendry Widyanto
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
