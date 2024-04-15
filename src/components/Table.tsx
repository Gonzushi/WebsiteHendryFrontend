import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type columnDetailsType = {
  key: string;
  header: string;
};

type tableProps<dataType> = {
  className?: string;
  data: dataType[];
  columnDetails: columnDetailsType[];
  idKey: string;
  isLoading: boolean;
  totalData: number;
  fetchData: (page: number) => void;
  showEditMenu: boolean;
  updateButtonPressed: (data: dataType) => void;
  deleteData: (id: number) => void;
};

export default function Table<dataType>(props: tableProps<dataType>) {
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(props.totalData / 10);

  const generateHeader = (): JSX.Element => {
    return (
      <tr>
        {props.columnDetails.map((col, index) => {
          return (
            <th key={index} className="px-4 py-3 text-center">
              {col.header}
            </th>
          );
        })}
        <th className="px-4 py-3 text-center"></th>
      </tr>
    );
  };

  const generateRow = (rowData: any, row: number): JSX.Element => {
    return (
      <tr key={row} className="border-b">
        {props.columnDetails.map((col, index) => {
          return (
            <td key={index} className="px-4 py-3 text-center">
              {rowData[col.key]}
            </td>
          );
        })}
        {props.showEditMenu && (
          <td className="flex items-center justify-center space-x-4 px-4 py-3">
            <PencilIcon
              className="h-8 w-8 rounded-lg p-2 font-extrabold text-gray-600 hover:bg-gray-100 hover:text-primary-600"
              onClick={() => props.updateButtonPressed(rowData)}
            />
            <XMarkIcon
              className="h-8 w-8 rounded-lg p-1 font-extrabold text-gray-600 hover:bg-gray-100 hover:text-primary-600"
              onClick={() => props.deleteData(rowData[props.idKey])}
            />
          </td>
        )}
      </tr>
    );
  };

  const generateRows = (): JSX.Element => {
    return (
      <>
        {props.data.map((rowData, row) => {
          return generateRow(rowData, row);
        })}
      </>
    );
  };

  const nextPage = () => {
    if (page != maxPage) {
      props.fetchData(page + 1);
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page != 1) {
      props.fetchData(page - 1);
      setPage(page - 1);
    }
  };

  const pagination = () => {
    let x = "";
    if (props.totalData == 0) {
      x += "0";
      x += "-";
    } else {
      x += (page - 1) * 10 + 1;
      x += "-";
    }

    if (page * 10 < props.totalData) {
      x += page * 10;
    } else {
      x += props.totalData;
    }
    return x;
  };

  return (
    <section className={props.className}>
      <div className="mx-auto w-full ">
        <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                {generateHeader()}
              </thead>
              {!props.isLoading && <tbody>{generateRows()}</tbody>}
            </table>
          </div>
          {props.isLoading && (
            <div className="flex min-h-48 w-full items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin  text-primary-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading Data
            </div>
          )}

          <nav className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0">
            <span className="text-sm font-normal text-gray-500">
              Showing
              <span className="mx-2 font-semibold text-gray-900">
                {pagination()}
              </span>
              of
              <span className="mx-2 font-semibold text-gray-900">
                {props.totalData}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => prevPage()}
                  className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <ChevronLeftIcon className="h-4 w-4 font-extrabold text-gray-600" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => nextPage()}
                  className="ml-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <ChevronRightIcon className="h-4 w-4 font-extrabold text-gray-600" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export { type columnDetailsType };
