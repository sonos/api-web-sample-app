import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";

import { Component } from "react";

class SetVolume extends Component {
  constructor() {
    super();
    this.authentication = new Authentication();
    this.GROUP_ID = window.localStorage.group_id;
  }

  apiCall(volume) {
    const PLAYER_ID = JSON.parse(localStorage.players)[0]['id']
    let end_point_ =
      config.api_end_points.volume_api_end_point +
      PLAYER_ID +
      "/playerVolume"
    // console.log("Endpoint is: " + end_point_);

    const headers_ = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authentication.get_access_token(),
    };

    return axios({
      url: end_point_,
      method: "post",
      headers: headers_,
      data:{"volume":volume}
    });
  }

  setVolume(volume) {
    this.apiCall(volume)
    .then((res) => {console.log("Set Volume to: ", volume)})
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
}

export default SetVolume;
