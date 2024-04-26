import axios from "axios";
import API from "./api";

type resIp = {
  ip: string;
};

type resCookie = {
  session_id: string;
};

const API_URL = API();

const getCookie = (cookiename: string) => {
  const cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "",
  );
};

const pageView = async (location: any) => {
  axios({ method: "get", url: "https://api.ipify.org/?format=json" })
    .catch((error) => {
      console.log("Cannot connect to api.ipfy.org");
      return Promise.reject(error);
    })
    .then((res) => {
      const data: resIp = res?.data;
      axios({
        method: "post",
        url: API_URL + "/analytics/event",
        data: {
          session_id: getCookie("session_id"),
          ip_address: data.ip,
          type: "page_view",
          description: location.pathname + location.search,
        },
      }).then((res) => {
        const browserCookie = getCookie("session_id");
        const data: resCookie = res?.data;
        if (browserCookie != data.session_id) {
          document.cookie =
            "session_id=" +
            data.session_id +
            "; Max-Age=31536000; Path=/; SameSite=lax";
        }
      });
    });
};

export default pageView;
