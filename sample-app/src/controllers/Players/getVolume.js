import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";


function apiCall(){

    const authentication = new Authentication();

    const PLAYER_ID = JSON.parse(localStorage.players)[0]['id']
    let end_point_ =
      config.api_end_points.volume_api_end_point +
      PLAYER_ID +
      "/playerVolume"
    // console.log("Endpoint is: " + end_point_);

    const headers_ = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authentication.get_access_token(),
    };

    return axios({
      url: end_point_,
      method: "get",
      headers: headers_,
      data:{}
    });
  }

  export default function GetVolume(props) {
    apiCall()
    .then((res => {
        console.log("Volume at start is : ", res.data);
        props.getVolumeHandler(false, res.data.volume);
    }))
    .catch(function (error) {
        console.log(error);
    });
  }
