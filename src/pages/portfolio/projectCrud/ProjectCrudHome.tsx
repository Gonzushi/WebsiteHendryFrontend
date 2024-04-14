import Table, { columnDetailsType } from "../../../components/Table";
import ModalAdd from "../../../components/Modal";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

type brandData = {
  id: number;
  name: string;
};

type brandResponse = {
  total: number;
  records: brandData[];
};

type brandCreate = {
  name: FormDataEntryValue | null;
};

export default function ProjectCrudHome() {
  const [data, setData] = useState<brandData[]>([]);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [error, SetError] = useState();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [totalData, setTotalData] = useState(0);
  // const API_URL = "http://localhost:7071";
  const API_URL = "https://api.hendrywidyanto.com";

  if (error) {
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  const columnDetails: columnDetailsType[] = [
    {
      key: "id",
      header: "Brand ID",
    },
    {
      key: "name",
      header: "Brand Name",
    },
  ];

  const deleteBrand = (brandId: number) => {
    SetIsLoading(true);
    axios({
      method: "delete",
      url: API_URL + "/project_crud/brand/" + brandId,
    }).then(() => fetchData(1));
  };

  const createBrand = (e: React.FormEvent<HTMLFormElement>) => {
    SetIsLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const brandData: brandCreate = {
      name: data.get("name"),
    };

    axios({
      method: "post",
      url: API_URL + "/project_crud/brand/",
      data: brandData,
    }).then(() => {
      fetchData(1);
    });
  };

  const fetchData = async (page: number) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    SetIsLoading(true);

    try {
      const url =
        API_URL + "/project_crud/brand/?limit=10&skip=" + (page - 1) * 10;
      const response = await fetch(url, {
        signal: abortControllerRef.current?.signal,
      });
      const retrieveData = (await response.json()) as brandResponse;
      setData(retrieveData.records);
      setTotalData(retrieveData.total);
    } catch (e: any) {
      if (e.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      console.log("Fetch error");
      SetError(e);
    } finally {
      SetIsLoading(false);
    }
  };

  const updateShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="mx-4 mt-2">
      <div className="flex flex-col items-center justify-between space-y-3 rounded-lg border border-gray-300 p-2 shadow-md md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-full md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
          <div className=" m ms-3 text-center font-semibold md:mb-0">
            Table Brand
          </div>
          <ModalAdd
            buttonName="Add brand"
            showModal={showModal}
            updateShowModal={updateShowModal}
          >
            <form onSubmit={(e) => createBrand(e)}>
              <div className="mb-4 grid gap-4 sm:grid-cols-1">
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
                    placeholder="Type product name"
                    required
                  />
                </div>
              </div>

              <div className="flex w-full justify-end">
                <button
                  type="submit"
                  className="w-fit items-center rounded-lg bg-primary-700 px-5 py-2.5  text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                  onClick={() => updateShowModal()}
                >
                  Add new brand
                </button>
              </div>
            </form>
          </ModalAdd>
        </div>
      </div>
      <Table<brandData>
        className="mt-4"
        data={data}
        columnDetails={columnDetails}
        deleteData={deleteBrand}
        idKey="id"
        isLoading={isLoading}
        totalData={totalData}
        fetchData={fetchData}
      />
    </div>
  );
}
