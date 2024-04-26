import { AgChartsReact } from "ag-charts-react";
import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import { useState, useEffect } from "react";
// import { Map, Marker } from "react-map-gl";
// import { XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import API from "../../utilites/api";

type dataPageView = {
  path: string;
  total: number;
};

export default function WebsiteAnalytics() {
  const [dataView, setDataView] = useState<dataPageView[]>([]);
  const [options, setOptions] = useState<AgChartOptions>({});
  const API_URL = API();

  const fetchDataView = async () => {
    axios({
      method: "get",
      url: API_URL + "/analytics/event/page_view",
    }).then((res) => {
      if (res?.status == 200) {
        const data: dataPageView[] = res?.data;
        setDataView(data);
      }
    });
  };

  useEffect(() => {
    fetchDataView();
    setOptions({
      data: dataView as dataPageView[],
      series: [
        {
          type: "bar",
          xKey: "path",
          yKey: "total",
          fill: "#2563eb",
        } as AgBarSeriesOptions,
      ],
    });
  }, [dataView]);

  // const [data, setData] = useState([
  //   { latitude: -6.1944, longitude: 106.8229, total: 100 },
  //   { latitude: 37.7833, longitude: -122.4167, total: 200 },
  //   { latitude: 37.78825, longitude: -122.4, total: 300 },
  // ]);

  return (
    <div className="mx-auto mt-4 max-w-screen-lg p-6">
      <h1 className="text-xl font-semibold">Website Analytics</h1>

      <div id="background" className="py-3">
        <p className="font-semibold">Background:</p>
        <p>
          I am curious who visited my website. So, I want to keep track the
          visitors and the most visited pages. I have tried to use Google
          Analytics but it is just a bit too overkill for me. Then, I think it
          would be a good idea to create my own analytics tool since I have my
          own database and API.
        </p>
      </div>

      <div id="source-code" className="py-3">
        <p className="font-semibold">Source code:</p>
        If you would like to see the source code, you can visit my github:
        <ul className="ml-8 list-disc">
          <li>
            <a
              href="https://github.com/Gonzushi/WebsiteHendryFrontend"
              className="text-blue-500 underline"
              target="_blank"
            >
              Frontend
            </a>
            : the code for this specific project is under
            ./src/utilites/analytics.tsx
          </li>
          <li>
            <a
              href="https://github.com/Gonzushi/WebsiteHendryBackend"
              className="text-blue-500 underline"
              target="_blank"
            >
              Backend/API
            </a>
            : the code for this specific project is under ./apps/analytics
          </li>
        </ul>
      </div>

      <div id="tools" className="py-3">
        <p className="font-semibold">Tools:</p>
        <ul className="ml-8 list-disc">
          <li>Database: MS SQL Server</li>
          <li>API: Python, FastAPI, ODBC Driver for SQL Server, SQL Alchemy</li>
        </ul>
      </div>

      <div id="plan" className="py-3">
        <p className="font-semibold">Plan:</p>
        <p>
          I have a SQL Server database that is hosted in Microsoft Azure. So, I
          will build two tables.
        </p>
        <div className="py-3">
          The first table is "Visitors". It will contain a session_id. So, there
          would be no duplicate of a visitor from the same browser. In this
          case, I need to send a cookie to the visitor's browser, so the
          session_id will always be sent to my API for reference.
          <ul className="ml-8 list-disc">
            <li>session_id</li>
            <li>ip_address</li>
            <li>country_code</li>
            <li>country_name</li>
            <li>region_name</li>
            <li>city_name</li>
            <li>latitude</li>
            <li>longitude</li>
            <li>zip_code</li>
            <li>time_zone</li>
          </ul>
        </div>
        <div className="">
          The second table is "Events". It will contain the the type of event
          which can be a page view, a mouse click, etc. The description can be
          used for what page is being seen, what button is being pressed, and
          etc.
          <ul className="ml-8 list-disc">
            <li>id</li>
            <li>type</li>
            <li>description</li>
            <li>ip_address</li>
            <li>session_id</li>
          </ul>
        </div>
        <div className="py-3">
          <p>
            Once the tables are created in the database. I need to build an API
            so I can perform CRUD from my website.
          </p>
        </div>
      </div>

      <div id="workflow" className="py-3">
        <p className="font-semibold">Workflow:</p>
        <ol className="ml-8 list-decimal">
          <li>
            User visit a page, then it will trigger a function called
            "uploadEvent"
          </li>
          <li>
            The function will send a POST request with the following data:
            session ID, IP address, event type, and description of the event.
            For example:
            <ul className="ml-8 list-disc">
              <li>session_id: "38b2ff08-87d7-4eed-b572-9c84d1a37206"</li>
              <li>ip_address: "98.153.117.66"</li>
              <li>type: "page_view"</li>
              <li>description: "/portfolio/website-analytics"</li>
            </ul>
          </li>
          <li>
            The data will then be received by the API. The backend will complete
            the information of the IP addrress such as country, city, longitude,
            lattitude, etc.
          </li>
          <li>
            Then, all the information is stored in "Visitors" and "Events"
            table.
          </li>
        </ol>
      </div>

      <div id="file-structures" className="py-3">
        <p className="font-semibold">File Structures:</p>
        <div className="py-3">
          The backend will have four files:
          <ul className="ml-8 list-disc">
            <li>models.py: contain the model of the database.</li>
            <li>
              schemas.py: contain the schema of the data. It is more for type
              hint and documentation.
            </li>
            <li>crud.py: contain function to perform CRUD operation.</li>
            <li>api.py: contain the API that will be exposed.</li>
          </ul>
          <p className="mt-4">
            Meanwhile, for the frontend, it is mainly just one function called
            uploadEvent. This is just a POST request to send the information to
            the API.
          </p>
        </div>
      </div>

      <div id="demo-chart" className="py-3">
        <p className="font-semibold">Demo:</p>
        <p>
          Below is a chart of the most visited pages. Well, this site is a
          personal website. So, it is mostly just me playing around or
          developing this site. Right now, I only have one type of event which
          is "page_view". But, it can be used for more. I just don't have other
          use case for now, and I only want to know how many unique users and
          the most visited pages.
        </p>
        <div className="mt-6 max-h-96 overflow-hidden rounded-lg border border-gray-300 p-4 shadow-lg">
          <AgChartsReact options={options} />
        </div>

        {/* <div className="overflow-hidden">
          <Map
            mapboxAccessToken="pk.eyJ1IjoiaGVuZHJ5d2lkeWFudG8iLCJhIjoiY2x2aDhhNXl5MHc2YzJvbzF3M3liOHY2NiJ9.6Z29oynUALXdbYqXT_z84w"
            initialViewState={{
              longitude: 106.8229,
              latitude: -6.1944,
              zoom: 10,
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/hendrywidyanto/clvh8f1wi030a01ph1p260c6y"
          >
            {data.map((item) => (
              <Marker
                key={item.latitude}
                latitude={item.latitude}
                longitude={item.longitude}
                anchor="bottom"
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div className="marker">
                  <XCircleIcon className="h-8 w-8" />
                  <p>{item.total}</p>
                </div>
              </Marker>
            ))}
          </Map>
        </div> */}
      </div>
    </div>
  );
}
