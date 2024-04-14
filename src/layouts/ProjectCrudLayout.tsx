import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function ProjectCrudLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

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
      setShowMenu(false);
    }
  };

  const styleMenu = clsx(
    !showMenu && "hidden",
    "absolute left-0 z-50 w-full bg-white px-4 md:static md:mx-0  md:my-2 md:block md:w-60",
  );

  const updateShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <section className="border-b-2 p-1 pt-2 md:hidden">
        <div
          className="inline-flex w-full items-center space-x-4  px-2"
          ref={buttonRef}
        >
          {showMenu && (
            <XMarkIcon
              className="h-10 w-10 rounded-lg p-1 text-primary-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 "
              onClick={() => updateShowMenu()}
            />
          )}
          {!showMenu && (
            <Bars3Icon
              className="h-10 w-10 rounded-lg p-1 text-primary-600 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 "
              onClick={() => updateShowMenu()}
            />
          )}
          <span className="font-semibold" onClick={() => updateShowMenu()}>
            Project Menu
          </span>
        </div>
      </section>

      <section className="relative mx-auto mt-4 md:flex">
        <div className="" ref={menuRef}>
          <SideBar className={styleMenu} itemOnClick={() => updateShowMenu()} />
        </div>
        <main className="w-full">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
