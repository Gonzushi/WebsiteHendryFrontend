import { Link } from "react-router-dom";
import {
  ChartPieIcon,
  TableCellsIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

type SideBarProps = {
  className?: string;
  itemOnClick?: () => void;
};

export default function SideBar(props: SideBarProps) {
  const [showChildTable, setShowChildMenu] = useState(true);
  const styleChildTable = clsx(!showChildTable && "hidden", "space-y-2 py-2");

  const updateShowTable = () => {
    setShowChildMenu(!showChildTable);
  };

  return (
    <div className={props.className}>
      <section className="w-full rounded-lg border border-gray-300 shadow-lg">
        <div className="overflow-hidden px-3 py-5">
          <ul className="space-y-2">
            <li>
              <Link
                to=""
                className="items-left group flex rounded-lg p-2 font-normal text-gray-900 hover:bg-gray-100"
                onClick={props.itemOnClick}
              >
                <ChartPieIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-3">Overview</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => updateShowTable()}
              >
                <TableCellsIcon className="h-6 w-6 text-gray-400" />
                <span className="ml-3 flex-1 whitespace-nowrap text-left">
                  Tables
                </span>
                {!showChildTable && (
                  <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                )}
                {showChildTable && (
                  <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
              <ul id="dropdown-pages" className={styleChildTable}>
                <li>
                  <Link
                    to="brand"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
                    onClick={props.itemOnClick}
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    to="product"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100"
                    onClick={props.itemOnClick}
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
