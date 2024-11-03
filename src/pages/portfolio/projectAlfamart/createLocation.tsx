import axios from "axios";
import { LocationData } from "./Interfaces";

export default async function createLocation(locationData: LocationData) {
  try {
    const response = await axios.post(
      "http://api.hendrywidyanto.com/project_map/location/",
      locationData,
    );
    console.log("Location created successfully:", response.data);
  } catch (error) {
    console.error("Error creating location:", error);
  }
}
