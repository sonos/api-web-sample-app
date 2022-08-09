import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";
import { PlaybackApiFactory } from "../museClient/api";

function apiCall(device_id) {
  const authentication = new Authentication();

  let end_point =
    config.apiEndPoints.controlApiURL + device_id + "/playback";

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

  const playbackApi = new PlaybackApiFactory(props.museClientConfig);
  playbackApi.playbackGetPlaybackStatus(props.deviceId)
  .then((res) => {
    console.debug(
      "Group Playback state at start is : ",
      res.playbackState
    );
    props.getPlaybackStateHandler(false, res.playbackState);
  })
  .catch(function (error) {
    console.error(error);
  });

  /*apiCall(props.device_id)
    .then((res) => {
      console.debug(
        "Group Playback state at start is : ",
        res.data.playbackState
      );
      props.getPlaybackStateHandler(false, res.data.playbackState);
    })
    .catch(function (error) {
      console.error(error);
    });*/
}
