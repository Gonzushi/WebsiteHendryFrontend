import SideBar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import clsx from "clsx";

export default function ProjectCrudLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const styleMenu = clsx(
    !showMenu && "hidden",
    "m-2 rounded-lg border border-gray-300 shadow-lg md:block md:h-screen md:w-60",
  );

  const updateShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <section className="border-b-2 p-1 pt-2 md:hidden">
        <div className="inline-flex w-full items-center space-x-4  px-2">
          <Bars3Icon
            className="h-8 w-8 text-gray-400"
            onClick={() => updateShowMenu()}
          />
          <span className="font-semibold" onClick={() => updateShowMenu()}>
            Project Menu
          </span>
        </div>
      </section>

      <section className="mx-auto mt-4 md:flex">
        <SideBar className={styleMenu} itemOnClick={() => updateShowMenu()} />
        <main className="w-full">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
