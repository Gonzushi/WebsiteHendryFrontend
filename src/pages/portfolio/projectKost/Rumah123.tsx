import React, { useState } from "react";
import axios from "axios";

// Define the structure of the JSON data
interface Property {
  Title: string;
  Price: number;
  Location: string;
  Bedrooms: number;
  Bathrooms: number;
  "Land Area": number;
  "Building Area": number;
  "Agent Name": string;
  URL: string;
  "Price per Bedroom": number;
  "Cost per Bedroom": number;
  "Area per Bedroom": number;
}

interface FormData {
  base: string;
  minPrice: number;
  minLandArea: number;
  minBuiltupSize: number;
  maxLandArea: number;
  maxBuiltupSize: number;
  max_page: number;
}

const PropertyTableWithForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    base: "jual/depok/rumah",
    minPrice: 400000000,
    minLandArea: 150,
    minBuiltupSize: 300,
    maxLandArea: 2000,
    maxBuiltupSize: 2000,
    max_page: 2,
  });

  const [data, setData] = useState<Property[]>([]); // Initially, using static json data
  const [columns] = useState<string[]>([
    "Title",
    "Price",
    "Price per Bedroom",
    "Detail",
    "Location",
    "Cost per Bedroom",
    "Area per Bedroom",
    "Agent Name",
  ]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Function to format numbers to 2 decimal places
  const formatNumber = (num: string | number): string => {
    const numericValue = typeof num === "number" ? num : parseFloat(num);
    return isNaN(numericValue) ? "0" : numericValue.toFixed(2);
  };

  // Function to handle sorting
  const handleSort = (column: string) => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[column as keyof Property];
      const bValue = b[column as keyof Property];

      // Handle sorting of numbers and strings
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortAsc ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortAsc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0; // Fallback for unhandled types
    });

    setData(sortedData);
    setSortColumn(column);
    setSortAsc(column === sortColumn ? !sortAsc : true); // Toggle direction for the same column
  };

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "base" ? value : Number(value),
    });
  };

  // Function to handle row click
  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  // Function to extract URL from anchor tag string
  const extractUrl = (urlString: string): string => {
    const regex = /href="(https?:\/\/[^"]+)"/;
    const match = urlString.match(regex);
    return match ? match[1] : urlString;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams(formData as any).toString();
    const url = `https://api.hendrywidyanto.com/rumah123/?${query}`;
    console.log(url)
    try {
      setData([])
      const response = await axios.get(url);
      setData(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4">
      <div className="w-full max-w-screen-xl px-0 lg:px-6 xl:px-8">
        <div className="mx-auto mt-5 max-w-lg rounded-lg border bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Property Query Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Base
              </label>
              <input
                type="text"
                name="base"
                value={formData.base}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={formData.minPrice}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Min Land Area
              </label>
              <input
                type="number"
                name="minLandArea"
                value={formData.minLandArea}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Min Built-up Size
              </label>
              <input
                type="number"
                name="minBuiltupSize"
                value={formData.minBuiltupSize}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Max Land Area
              </label>
              <input
                type="number"
                name="maxLandArea"
                value={formData.maxLandArea}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Max Built-up Size
              </label>
              <input
                type="number"
                name="maxBuiltupSize"
                value={formData.maxBuiltupSize}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Max Page
              </label>
              <input
                type="number"
                name="max_page"
                value={formData.max_page}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Property Listings Table */}
        <div className="flex min-h-screen flex-col items-center bg-white p-4">
          <div className="w-full max-w-screen-xl px-0 lg:px-6 xl:px-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Property Listings Jakarta
            </h2>
            {data.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse rounded-lg border border-gray-300">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      {columns.map((col, index) => (
                        <th
                          key={index}
                          className="cursor-pointer px-4 py-2 text-center text-sm font-medium"
                          onClick={() => handleSort(col)}
                          style={
                            col === "Title"
                              ? { width: "12rem" }
                              : col === "Price"
                                ? { width: "4rem" }
                                : col === "Price per Bedroom"
                                  ? { width: "4rem" }
                                  : col === "Detail"
                                    ? { width: "10rem" }
                                    : col === "Location"
                                      ? { width: "6rem" }
                                      : col === "Cost per Bedroom"
                                        ? { width: "6rem" }
                                        : col === "Area per Bedroom"
                                          ? { width: "6rem" }
                                          : col === "Agent Name"
                                            ? { width: "8rem" }
                                            : { width: "8rem" }
                          }
                        >
                          {col}
                          {sortColumn === col && (
                            <span className="ml-2">{sortAsc ? "↑" : "↓"}</span> // Show sorting direction
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        onClick={() => handleRowClick(rowIndex)}
                        className={`cursor-pointer transition duration-150 hover:bg-green-100 ${
                          selectedRow === rowIndex
                            ? "bg-green-200"
                            : rowIndex % 2 === 0
                              ? "bg-gray-100"
                              : "bg-white"
                        }`}
                      >
                        {columns.map((col, colIndex) => (
                          <td
                            key={colIndex}
                            className={`px-4 py-2 text-sm text-gray-700 ${
                              col === "Price per Bedroom" ||
                              col === "Cost per Bedroom" ||
                              col === "Area per Bedroom" ||
                              col === "Price" ||
                              col === "Detail"
                                ? "text-center"
                                : ""
                            }`}
                          >
                            {col === "Title" ? (
                              <a
                                href={extractUrl(row.URL)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {row.Title}
                              </a>
                            ) : col === "Detail" ? (
                              <a
                                href={extractUrl(row.URL)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                {`${row.Bedrooms} / ${row.Bathrooms} / ${row["Land Area"]} / ${row["Building Area"]}`}
                              </a>
                            ) : col === "Price per Bedroom" ||
                              col === "Cost per Bedroom" ||
                              col === "Area per Bedroom" ? (
                              formatNumber(row[col as keyof Property] as number)
                            ) : (
                              row[col as keyof Property] || "-"
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-6 text-center text-gray-500">
                No data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyTableWithForm;
