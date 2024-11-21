import React, { useState } from "react";
import jsonData from "./pg_jakarta.json";

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
  // Set state for the data and columns with the new order
  const [data] = useState<Property[]>(jsonData);
  const [columns] = useState<string[]>([
    "Title",
    "Price",
    "Price per Bedroom",
    "Detail", // Added the new "Detail" column
    "Location",
    "Cost per Bedroom",
    "Area per Bedroom",
    "Agent Name",
  ]);

  // Set state for selected row
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Function to format numbers to 2 decimal places
  const formatNumber = (num: number): string => {
    return num.toFixed(2);
  };

  // Function to extract URL from anchor tag string
  const extractUrl = (urlString: string): string => {
    const regex = /href="(https?:\/\/[^"]+)"/; // Extracts the URL within the href attribute
    const match = urlString.match(regex);
    return match ? match[1] : urlString; // Return the extracted URL or the original string
  };

  // Function to handle row click
  const handleRowClick = (index: number) => {
    console.log(index);
    setSelectedRow(index === selectedRow ? null : index); // Toggle selection
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4">
      <div className="w-full max-w-screen-xl px-0 lg:px-6 xl:px-8">
        {" "}
        {/* Set max width and padding */}
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
                      className="px-4 py-2 text-center text-sm font-medium"
                      style={
                        col === "Title"
                          ? { width: "12rem" }
                          : col === "Price"
                            ? { width: "4rem" }
                            : col === "Price Per Bedroom"
                              ? { width: "4rem" }
                              : col === "Detail"
                                ? { width: "8rem" }
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
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => handleRowClick(rowIndex)}
                    className={`cursor-pointer transition duration-150 hover:bg-gray-200 ${
                      selectedRow === rowIndex
                        ? "bg-green-100"
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
                          col === "Area per Bedroom"
                            ? "text-center" // Center the numbers
                            : ""
                        } sm:text-xs md:text-sm lg:text-base`}
                        style={col === "Title" ? { width: "2rem" } : {}}
                      >
                        {col === "Title" ? (
                          // Make the Title field clickable with the URL
                          <a
                            href={extractUrl(row.URL)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {row.Title}
                          </a>
                        ) : col === "Detail" ? (
                          // Make the Detail field clickable with the URL
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
                          // Format the numeric fields to show only 2 decimal places
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
