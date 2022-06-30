import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";

function apiCall(volume, device_id, device_type) {
  const authentication = new Authentication();

  let url =
    device_type === "GROUP"
      ? config.api_end_points.control_api_endpoint
      : config.api_end_points.volume_api_end_point;
  let name_space = device_type === "GROUP" ? "/groupVolume" : "/playerVolume";

  const end_point = url + device_id + name_space;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point,
    method: "post",
    headers: headers,
    data: { volume: volume },
  });
}

export default function SetVolume(volume, device_id, device_type) {
  apiCall(volume, device_id, device_type)
    .then((res) => {
      console.debug("Set Volume to: ", volume);
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    });
}
