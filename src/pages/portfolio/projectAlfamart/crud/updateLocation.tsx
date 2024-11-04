import axios from "axios";
import { LocationData } from "../helper/Interfaces";

export default async function updateLocation(id: number, locationData: LocationData) {
  try {
    await axios.put(
      `https://api.hendrywidyanto.com/project_map/location/${id}`,
      locationData,
    );
  } catch (error) {
    console.error("Error creating location:", error);
  }
}
