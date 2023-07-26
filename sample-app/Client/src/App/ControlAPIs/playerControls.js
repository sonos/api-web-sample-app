import Helper from "../Utility/helper";
import { Component } from "react";

/**
 * Helper class used to make player control Sonos API calls
 */
class HelperControls extends Component {
  constructor() {
    super();

    // Used to make API calls
    this.helper = new Helper();
  }

  /**
   * Calls apiCall() from ../Utility/helper.js using the specified control action, group, and data
   * @param input_action {string} Specific control action to execute
   * @param groupId {string} Group ID to target in API call
   * @param data {JSON} Body of API call
   */
  helperControls(input_action, groupId, data) {
    let endPoint =
      this.helper.getGroupsURL() + groupId + "/" + input_action;

    // Contains access token and API response format specifier
    const headers = this.helper.getHeaderBearer();

    // Executes API call
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
