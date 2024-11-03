import axios from "axios";

export default async function readLocations() {
  try {
    const response = await axios.get(
      "https://api.hendrywidyanto.com/project_map/location/",
    );
    if (response.status == 200) {
      return response.data.records;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error read locations:", error);
  }
}
