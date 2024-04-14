export default function api() {
  let x = "";
  if (import.meta.env.MODE == "development") {
    x = "http://127.0.0.1:8000";
  } else {
    x = "https://api.hendrywidyanto.com";
  }
  return x;
}
