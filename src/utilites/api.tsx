export default function api() {
  let api_address: string;
  if (import.meta.env.MODE == "development") {
    api_address = "http://127.0.0.1:8000";
  } else {
    api_address = "https://api.hendrywidyanto.com";
  }
  return api_address;
}
