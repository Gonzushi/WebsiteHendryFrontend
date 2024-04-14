export default function API() {
  let API = "";
  if (import.meta.env.MODE === "development") {
    API = "/api";
  } else {
    API = "https://api.hendrywidyanto.com/";
  }
  return API;
}
