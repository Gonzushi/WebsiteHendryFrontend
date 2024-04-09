import { Link, NavLink } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

export default function Navbar() {
  const [menuHidden, setMenuHidden] = useState(true);
  const styleMenu = clsx(menuHidden && "hidden", "w-full md:block md:w-auto");
  const styleLink = clsx(
    "block rounded-xl px-3 py-2 text-lg hover:bg-blue-700 hover:text-white md:bg-transparent md:p-0 md:text-black md:hover:bg-transparent md:hover:text-primary-500",
  );

  const changeMenuHidden = () => {
    setMenuHidden(!menuHidden);
  };

  return (
    <nav className="border-b-2 border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
        <Link to="/" className="flex items-center space-x-4">
          <SparklesIcon className="h-8 w-8 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
          <span className="text-2xl font-semibold">Hendry Widyanto</span>
        </Link>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          onClick={() => changeMenuHidden()}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-10 w-10 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
        </button>
        <div className={styleMenu} id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-xl border-2 border-gray-300 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <NavLink
                to="/"
                className={styleLink}
                onClick={() => changeMenuHidden()}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={styleLink}
                onClick={() => changeMenuHidden()}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resume"
                className={styleLink}
                onClick={() => changeMenuHidden()}
              >
                Resume
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={styleLink}
                onClick={() => changeMenuHidden()}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
