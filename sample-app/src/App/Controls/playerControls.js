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
    let end_point_ =
      config.api_end_points.control_api_endpoint +
      grp_id +
      "/playback/" + 
      input_action;

    const headers_ = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authentication.get_access_token(),
    };

    return axios({
      url: end_point_,
      method: "post",
      headers: headers_,
      data:{}
    });
  }

  helper_controls(input_action, grp_id) {
    this.apiCall(input_action, grp_id).catch(function (error) {
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

export default HelperControls;
