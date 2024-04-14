import Table, { columnDetailsType } from "../../../components/Table";
import Modal from "../../../components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../utilites/api";

type productData = {
  id: number;
  name: string;
  description: string;
  price: number;
  brand_id: number;
};

type productResponse = {
  total: number;
  records: productData[];
};

type productCreate = {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  price: number;
  brand_id: number;
};

type productUpdate = {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  price: number;
  brand_id: number;
};

export default function ProjectCrudProduct() {
  const [data, setData] = useState<productData[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [error, SetError] = useState(false);
  const [errorDetail, SetErrorDetail] = useState<any>(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [editData, setEditData] = useState<productData>();
  const API_URL = API();

  if (error) {
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  const columnDetails: columnDetailsType[] = [
    {
      key: "id",
      header: "Product ID",
    },
    {
      key: "name",
      header: "Product Name",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "price",
      header: "Price",
    },
    {
      key: "brand_id",
      header: "Brand ID",
    },
  ];

  const deleteBrand = (productID: number) => {
    SetIsLoading(true);
    axios({
      method: "delete",
      url: API_URL + "/project_crud/product/" + productID,
    })
      .catch((error) => handleAxiosError(error))
      .then(() => fetchData(1));
  };

  const createBrand = (e: React.FormEvent<HTMLFormElement>) => {
    updateShowModalAdd();
    SetIsLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const productData: productCreate = {
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      brand_id: Number(data.get("brand_id")),
    };

    console.log(productData);

    axios({
      method: "post",
      url: API_URL + "/project_crud/product/",
      data: productData,
    })
      .catch((error) => handleAxiosError(error))
      .then(() => {
        fetchData(1);
      });
  };

  const updateBrand = (e: React.FormEvent<HTMLFormElement>) => {
    updateShowModalEdit();
    SetIsLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(editData?.id);
    console.log(data.get("name"));
    const productData: productUpdate = {
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      brand_id: Number(data.get("brand_id")),
    };

    axios({
      method: "put",
      url: API_URL + "/project_crud/product/" + editData?.id,
      data: productData,
    })
      .catch((error) => handleAxiosError(error))
      .then(() => {
        fetchData(1);
      });
  };

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
      url: API_URL + "/project_crud/product/?limit=10&skip=" + (page - 1) * 10,
    })
      .catch((error) => handleAxiosError(error))
      .then((res) => {
        if (res?.status == 200) {
          const data: productResponse = res?.data;
          setData(data.records);
          setTotalData(data.total);
        }
      })
      .finally(() => SetIsLoading(false));
  };

  const updateShowModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const updateShowModalEditWithData = (data: productData) => {
    setEditData(data);
    setShowModalEdit(!showModalEdit);
  };

  const updateShowModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const closeModalError = () => {
    SetError(!error);
  };

  return (
    <div className="mx-4 mt-2">
      <div className="flex flex-col items-center justify-between space-y-3 rounded-lg border border-gray-300 p-2 shadow-md md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-full md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
          <div className=" m ms-3 text-center font-semibold md:mb-0">
            Table Products
          </div>
          <div className="m-5 flex justify-center">
            <button
              className="m-2 block w-full rounded-lg bg-primary-700 py-2 text-center text-sm font-medium text-white  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 md:px-4 "
              type="button"
              onClick={() => updateShowModalAdd()}
            >
              Add Product
            </button>
          </div>
          <Modal
            title="Add Product"
            showModal={showModalAdd}
            updateShowModal={updateShowModalAdd}
          >
            <form onSubmit={(e) => createBrand(e)}>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand_id"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand ID
                  </label>
                  <input
                    type="number"
                    name="brand_id"
                    id="brand_id"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="w-fit items-center rounded-lg bg-primary-700 px-5 py-2.5  text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                  // onClick={() => updateShowModalAdd()}
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <Modal
            title="Edit Product"
            showModal={showModalEdit}
            updateShowModal={updateShowModalEdit}
          >
            <form onSubmit={(e) => updateBrand(e)}>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="id"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Type brand id"
                    required
                    disabled
                    defaultValue={editData?.id}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                    defaultValue={editData?.name}
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    defaultValue={editData?.description}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    defaultValue={editData?.price}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand_id"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand ID
                  </label>
                  <input
                    type="number"
                    name="brand_id"
                    id="brand_id"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                    defaultValue={editData?.brand_id}
                  />
                </div>
              </div>

              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="w-fit items-center rounded-lg bg-primary-700 px-5 py-2.5  text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
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
      <Table<productData>
        className="mt-4"
        data={data}
        columnDetails={columnDetails}
        updateButtonPressed={updateShowModalEditWithData}
        deleteData={deleteBrand}
        idKey="id"
        isLoading={isLoading}
        totalData={totalData}
        fetchData={fetchData}
      />
    </div>
  );
}
