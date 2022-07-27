import Authentication from "../Authentication/authentication";
import Helper from "../Utility/helper";
import { METHOD_POST } from "../Utility/constants";

import { Component } from "react";

class HelperControls extends Component {

  constructor() {
    super();
    this.authentication = new Authentication();
    this.helper = new Helper();
  }

  helperControls(input_action, grp_id) {

    let endPoint = this.helper.getGroupsURL() + 
    grp_id + "/playback/" + input_action;
    
    const headers = this.helper.getHeaderBearer()

    const data = {};

    this.helper.apiCall(endPoint, headers, METHOD_POST, data)
    .then((res) => {
      return true;
    })
    .catch(function (error) {
      this.helper.logError(error);
      return false;
    });
  };
};

export default HelperControls;
