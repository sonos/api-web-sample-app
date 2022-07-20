import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";

function apiCall(device_id) {
  const authentication = new Authentication();

  let end_point =
    config.api_end_points.control_api_endpoint + device_id + "/playback";

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point,
    method: "get",
    headers: headers,
    data: {},
  });
}

export default function GetPlayBackState(props) {
  apiCall(props.device_id)
    .then((res) => {
      console.debug(
        "Group Playback state at start is : ",
        res.data.playbackState
      );
      props.getPlaybackStateHandler(false, res.data.playbackState);
    })
    .catch(function (error) {
      console.error(error);
    });
}
