import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconHW from "../assetts/icons/IconHW";
import { Bars3Icon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [menuHidden, setMenuHidden] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleOutsideClick(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleOutsideClick(e));
    };
  });

  const handleOutsideClick = (e: any) => {
    if (
      menuRef.current?.contains(e.target) == false &&
      buttonRef.current?.contains(e.target) == false
    ) {
      setMenuHidden(true);
    }
  };

  const styleMenu = clsx(
    menuHidden && "hidden",
    "absolute left-0 top-0 z-50 mt-20 w-full px-4 md:static md:mt-0 md:block md:w-auto",
  );
  const styleLink = clsx(
    "block rounded-xl px-3 py-2 text-lg hover:bg-blue-700 hover:text-white md:bg-transparent md:p-0 md:text-black md:hover:bg-transparent md:hover:text-primary-500",
  );

  const changeMenuHidden = () => {
    setMenuHidden(!menuHidden);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    setMenuHidden(!menuHidden);
  };

  return (
    <nav className="relative border-b-2 border-gray-200 bg-white shadow-sm">
      <div className=" mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
        <Link to="/" className="flex items-center space-x-4">
          <IconHW className="h-10 w-10 fill-primary-600 hover:fill-primary-800" />
          <span className="text-2xl font-semibold">Hendry Widyanto</span>
        </Link>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-1 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  md:hidden"
          onClick={() => changeMenuHidden()}
          ref={buttonRef}
        >
          <span className="sr-only">Open main menu</span>
          {menuHidden && (
            <Bars3Icon className="h-10 w-10 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
          )}
          {!menuHidden && (
            <XMarkIcon className="h-10 w-10 text-primary-600 hover:cursor-pointer hover:text-primary-800" />
          )}
        </button>
        <div className={styleMenu} id="navbar-default" ref={menuRef}>
          <ul className="flex flex-col rounded-xl border border-gray-300 bg-white p-4 font-medium shadow-lg md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:shadow-none md:dark:bg-gray-900">
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
              <a
                className={styleLink}
                onClick={() => setMenuHidden(!menuHidden)}
                href="https://github.com/Gonzushi"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className={styleLink}
                onClick={() => setMenuHidden(!menuHidden)}
                href="https://www.linkedin.com/in/hendry-widyanto/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a className={styleLink} onClick={() => scrollToBottom()}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
