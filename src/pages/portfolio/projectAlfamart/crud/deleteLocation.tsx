import axios from "axios";

export default async function deleteLocation(id: number) {
  try {
    await axios.delete(
      `https://api.hendrywidyanto.com/project_map/location/${id}`,
    );
  } catch (error) {
    console.error("Error deleting location:", error);
  }
}
