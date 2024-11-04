import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LocationData, LocationDataID } from "./Interfaces";
import deleteLocation from "../crud/deleteLocation";
import readLocations from "../crud/readLocations";
import createLocation from "../crud/createLocation";
import updateLocation from "../crud/updateLocation";

interface FormLocationProps {
  pinLocation: [number, number];
  editMode: boolean;
  setSavedLocations: React.Dispatch<React.SetStateAction<LocationDataID[]>>;
  setAddedPin: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  location?: LocationDataID;
}

export default function FormLocation(props: FormLocationProps) {
  const { pinLocation, location, setSavedLocations, setAddedPin } = props;
  const [editMode, setEditMode] = useState(props.editMode);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const values = watch();

  useEffect(() => {
    if (location) {
      setValue("phoneNumber", location.phone_number);
      setValue("area", location.area);
      setValue("type", location.type);
      setValue(
        "price",
        location.price ? new Intl.NumberFormat().format(location.price) : "",
      );
      setValue("comment", location.comment);
    }
  }, [location, setValue]);

  const handleDelete = () => {
    if (location) {
      deleteLocation(location.id).then(() => {
        readLocations().then((data) => {
          setSavedLocations(data);
        });
      });
      reset();
    }
  };

  const handleCancel = () => {
    if (location) {
      setEditMode(false);
      reset();
      setValue("phoneNumber", location.phone_number);
      setValue("area", location.area);
      setValue("type", location.type);
      setValue(
        "price",
        location.price ? new Intl.NumberFormat().format(location.price) : "",
      );
      setValue("comment", location.comment);
    }
  };

  const onUpdate = (data: any) => {
    console.log(data);
    if (location) {
      const locationData: LocationData = {
        latitude: location.latitude,
        longitude: location.longitude,
        phone_number: data.phoneNumber,
        area: data.area,
        type: data.type,
        price: data.price,
        comment: data.comment,
      };
      updateLocation(location.id, locationData).then(() => {
        setEditMode(false)
        location.phone_number = data.phoneNumber;
        location.type = data.type;
        location.area = data.area;
        location.price = data.price;
        location.comment = data.comment;
      });
    }
  };

  const onSubmit = (data: any) => {
    const locationData: LocationData = {
      latitude: pinLocation ? pinLocation[0] : 0,
      longitude: pinLocation ? pinLocation[1] : 0,
      phone_number: data.phoneNumber,
      area: data.area,
      type: data.type,
      price: data.price,
      comment: data.comment,
    };
    console.log("onSubmit", locationData);
    createLocation(locationData).then(() => {
      readLocations().then((data) => {
        setSavedLocations(data);
      });
    });
    reset();
    setAddedPin(null);
  };

  return (
    <>
      <a
        href={`https://www.google.com/maps?q=${pinLocation[0]},${pinLocation[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-xl font-medium text-gray-700"
      >
        Location
      </a>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-48">
          {/* Input fields remain unchanged */}

          <div className="mb-2">
            <label className="block text-sm text-gray-700">Phone Number:</label>
            <input
              type="number"
              {...register("phoneNumber")}
              className="mt-1 block h-8 w-full rounded-md border-2 border-gray-300 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!editMode}
              defaultValue={location?.phone_number}
            />
          </div>

          <div className="mb-1">
            <label className="block text-sm text-gray-700">Area:</label>
            <input
              type="number"
              {...register("area", { setValueAs: (value) => Number(value) })}
              className="mt-1 block h-8 w-full rounded-md border-2 border-gray-300 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!editMode}
              defaultValue={location?.area}
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm text-gray-700">Type:</label>
            <select
              {...register("type")}
              className="mt-1 block h-8 w-full rounded-md border-2 border-gray-300 bg-white px-3 pr-8 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!editMode}
              defaultValue={location?.type}
            >
              <option value="">{editMode ? "Select Type" : ""}</option>
              <option value="Apartment">Apartment</option>
              <option value="Gudang">Gudang</option>
              <option value="Rumah">Rumah</option>
              <option value="Ruko">Ruko</option>
              <option value="Tanah">Tanah</option>
              <option value="Toko">Toko</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm text-gray-700">Price:</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">Rp.</span>
              <input
                disabled={!editMode}
                type="text"
                {...register("price", {
                  validate: (value) => {
                    const cleanValue =
                      typeof value === "string"
                        ? value.replace(/,/g, "")
                        : value;
                    return !isNaN(cleanValue) || "Invalid number";
                  },
                  setValueAs: (value) =>
                    typeof value === "string"
                      ? Number(value.replace(/,/g, ""))
                      : value,
                })}
                defaultValue={location?.price}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat().format(
                    Number(rawValue),
                  );
                  e.target.value = formattedValue;
                }}
                className="mt-1 block h-8 w-full rounded-md border-2 border-gray-300 px-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-700">Comment:</label>
            <textarea
              {...register("comment")}
              rows={3}
              className="mt-1 block min-h-16 w-full rounded-md border-2 border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your comments here"
              disabled={!editMode}
              defaultValue={location?.comment}
            />
          </div>

          {editMode ? (
            location ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onUpdate)}
                  className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            )
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Edit
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
