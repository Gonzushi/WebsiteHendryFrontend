import Table, { columnDetailsType } from "../../../components/Table";
import Modal from "../../../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../utilites/api";

type data = {
  brand_id: number;
  product_id: number;
  product_name: string;
  brand_name: string;
  price: number;
  description: string;
};

type dataResponse = {
  total: number;
  records: data[];
};

export default function ProjectCruddBrand() {
  const [data, setData] = useState<data[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [error, SetError] = useState(false);
  const [errorDetail, SetErrorDetail] = useState<any>(null);
  const [totalData, setTotalData] = useState(0);
  const API_URL = API();

  if (error) {
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  const columnDetails: columnDetailsType[] = [
    {
      key: "product_name",
      header: "Product Name",
    },
    {
      key: "brand_name",
      header: "Brand Name",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "price",
      header: "Price",
    },
  ];

  const handleAxiosError = (error: any) => {
    SetError(true);
    if (error.response) {
      SetErrorDetail(error.response.data.detail);
      console.log(error);
    } else if (error.request) {
      SetErrorDetail("Cannot connect to server");
    } else {
      SetErrorDetail(error.Message);
    }
  };

  const fetchData = async (page: number) => {
    SetIsLoading(true);

    axios({
      method: "get",
      url: API_URL + "/project_crud/?limit=10&skip=" + (page - 1) * 10,
    })
      .catch((error) => handleAxiosError(error))
      .then((res) => {
        if (res?.status == 200) {
          const data: dataResponse = res?.data;
          setData(data.records);
          setTotalData(data.total);
        }
      })
      .finally(() => SetIsLoading(false));
  };

  const closeModalError = () => {
    SetError(!error);
  };

  return (
    <div className="mx-4 mt-2">
      <div className="my-6  px-4">
        <p className="text-xl font-semibold">CRUD Application</p>
        <p className="py-3">
          I create a simple application to build a relational database and API.
          The data is stored in MS SQL Server database that is hosted in
          Microsoft Azure. In this database, there are 2 tables. To interact
          with the database, I build an API using FastAPI. Then, I use this site
          as my frontend to display the data and interact with the API.
        </p>
        <p className="py-3">
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
              ./src/pages/portfolio/projectCrud
            </li>
            <li>
              <a
                href="https://github.com/Gonzushi/WebsiteHendryBackend"
                className="text-blue-500 underline"
                target="_blank"
              >
                API / Backend
              </a>
              : the code for this specific project is under ./apps/project_crud
            </li>
          </ul>
        </p>
        <p className="py-3">
          The first table is for brand with the following properties:
          <ul className="ml-8 list-disc">
            <li>id: Brand ID</li>
            <li>name: Brand Name</li>
          </ul>
        </p>
        <p className="py-3">
          The second table is for product with the following properties:
          <ul className="ml-8 list-disc">
            <li>id: Product ID</li>
            <li>name: Product Name</li>
            <li>description: Product Description</li>
            <li>price: Product Price</li>
            <li>brand_id: Brand ID</li>
          </ul>
        </p>
        <p className="py-3">
          In this project, the relationship of the brand and products is
          one-to-many. It means that there can be multiple products for one
          brand. You may add a brand and products if you want by clicking the
          tables on the project menu. You can also add the data using the API
          directly. If you want to play around with the API, you can go to the
          following:{" "}
          <a
            href="https://api.hendrywidyanto.com/docs"
            className="text-blue-500 underline"
            target="_blank"
          >
            API
          </a>{" "}
          (I am using Azure Function which will be paused due to inactivity. So,
          the API might need a few seconds to start)
        </p>
        <p className="py-3">
          Below is the final table when two tables are combined:
        </p>
      </div>
      <div className="flex flex-col items-center justify-between space-y-3 rounded-lg border border-gray-300 p-2 shadow-md md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-full md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
          <div className="ms-3 py-4 text-center font-semibold md:mb-0">
            PRODUCT PRICE FOR EACH BRAND
          </div>

          <Modal
            title="Error Occurred"
            showModal={error}
            updateShowModal={closeModalError}
          >
            <section>
              <p></p>
              <div className="w-full">
                <p className="mb-4">{errorDetail}</p>
                <div className="flex w-full justify-end">
                  <button
                    type="submit"
                    className="items-center rounded-lg bg-primary-700 px-5 py-2.5  text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                    onClick={() => closeModalError()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </section>
          </Modal>
        </div>
      </div>
      <Table<data>
        className="mt-4"
        data={data}
        columnDetails={columnDetails}
        idKey="id"
        isLoading={isLoading}
        totalData={totalData}
        fetchData={fetchData}
        showEditMenu={false}
        updateButtonPressed={() => {}}
        deleteData={() => {}}
      />
    </div>
  );
}
