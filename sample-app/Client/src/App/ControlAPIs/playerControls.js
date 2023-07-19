import Authentication from "../Authentication/authentication";
import Helper from "../Utility/helper";
import { Component } from "react";

class HelperControls extends Component {
  constructor() {
    super();
    this.authentication = new Authentication();
    this.helper = new Helper();
  }

  helperControls(input_action, grp_id, museClientConfig) {
    let endPoint =
      this.helper.getGroupsURL() + grp_id + "/playback/" + input_action;

    const headers = this.helper.getHeaderBearer();

    const data = {};

    this.helper
      .apiCall(endPoint, headers, "POST", data)
      .then((res) => {
        return true;
      })
      .catch(function (error) {
        console.error(error);
        return false;
      });
  }
}

export default HelperControls;
