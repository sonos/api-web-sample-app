import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import axios from "axios";

import { Component } from "react";

class HelperControls extends Component {
  constructor() {
    super();
    this.authentication = new Authentication();
  }

  apiCall(input_action, grp_id) {
    let end_point =
      config.api_end_points.control_api_endpoint +
      grp_id +
      "/playback/" + 
      input_action;

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authentication.get_access_token(),
    };

    return axios({
      url: end_point,
      method: "post",
      headers: headers,
      data:{}
    });
  }

  helper_controls(input_action, grp_id) {
    this.apiCall(input_action, grp_id).catch(function (error) {
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
}

export default HelperControls;
