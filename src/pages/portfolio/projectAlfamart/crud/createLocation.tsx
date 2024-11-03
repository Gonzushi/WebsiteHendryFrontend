import axios from "axios";
import { LocationData } from "../helper/Interfaces";

export default async function createLocation(locationData: LocationData) {
  try {
    await axios.post(
      "https://api.hendrywidyanto.com/project_map/location/",
      locationData,
    );
  } catch (error) {
    console.error("Error creating location:", error);
  }
}
