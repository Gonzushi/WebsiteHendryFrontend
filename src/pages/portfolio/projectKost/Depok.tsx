import React, { useState } from "react";
import jsonData from "./pg_depok.json";

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

const PropertyTable: React.FC = () => {
  // State for the data, columns, and sorting
  const [data, setData] = useState<Property[]>(jsonData);
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

  // State for selected row
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Function to format numbers to 2 decimal places
  const formatNumber = (num: number): string => num.toFixed(2);

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
        return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0; // Fallback for unhandled types
    });

    setData(sortedData);
    setSortColumn(column);
    setSortAsc(column === sortColumn ? !sortAsc : true); // Toggle direction for the same column
  };

  // Function to extract URL from anchor tag string
  const extractUrl = (urlString: string): string => {
    const regex = /href="(https?:\/\/[^"]+)"/;
    const match = urlString.match(regex);
    return match ? match[1] : urlString;
  };

  // Function to handle row click
  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4">
      <div className="w-full max-w-screen-xl px-0 lg:px-6 xl:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Property Listings Depok
        </h2>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse rounded-lg border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-center text-sm font-medium cursor-pointer"
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
                        <span className="ml-2">
                          {sortAsc ? "↑" : "↓"}
                        </span> // Show sorting direction
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
          <p className="mt-6 text-center text-gray-500">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyTable;
