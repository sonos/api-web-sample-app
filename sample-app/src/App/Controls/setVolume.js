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

  const end_point_ = url + device_id + name_space;

  const headers_ = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point_,
    method: "post",
    headers: headers_,
    data: { volume: volume },
  });
}

export default function SetVolume(volume, device_id, device_type) {
  apiCall(volume, device_id, device_type)
    .then((res) => {
      console.log("Set Volume to: ", volume);
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
}
