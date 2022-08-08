/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * Common methods used through the application will be defined here
 */

import axios from "axios";
import Authentication from "../Authentication/Authentication";
import config from "../../config.json";
import { Buffer } from "buffer";
import { logMessage } from "./CustomLogger";

class Helper {
  constructor() {
    this.authentication = new Authentication();
  }

  /*
   * api calling is done using the below mthod.
   */
  apiCall(endPoint, headers, method, data) {
    logMessage(
      "api call - endpoint : " +
        endPoint +
        " headers : " +
        JSON.stringify(headers) +
        " method : " +
        method +
        " data : " +
        JSON.stringify(data)
    );

    const options = {
      method: method,
      headers: headers,
      data: data,
      url: endPoint,
    };

    const response = axios(options);
    return response;
  }

  /*
   * api error logging is done in this method
   */
  logError(error) { 
    if (error.response) {
      // Request made and server responded
      console.error(error);

    } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
    }
  }


  /*
   * This method updates the access token Data in the local storage
   */
  setAccessTokeDatainStorage(accessTokenData) {
    window.localStorage.setItem(
      "access_token",
      JSON.stringify(accessTokenData)
    );
  }

  /*
   * This method returns the access token details stored in the localStorage
   */
  getAccessTokeDatafromStorage() {
    return JSON.parse(window.localStorage.accessToken);
  }

  /*
   * This method returns the group details stored in the localStorage
   */
  getGroupsFromStorage() {
    return JSON.parse(window.localStorage.getItem("groups"));
  }

  /*
   * This method updates the groups Data in the local storage
   */
  setGroupstoStorage(groups) {
    window.localStorage.setItem("groups", JSON.stringify(groups));
  }

  /*
   * This method return the bearer header with the latest access token
   */
  getHeaderBearer() {
    const bearerHeader = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authentication.getAccessToken(),
    };
    return bearerHeader;
  }

  /*
   * This method returns the oauth url from config.json
   */
  getOAuthUrl() {
    return (
      config.apiEndPoints.oauthURL +
      "client_id=" +
      this.getClientId() +
      "&response_type=code&state=testState&scope=playback-control-all&" +
      "redirect_uri=" +
      this.getRedirectURL()
    );
  }

  /*
   * This method returns the Client ID from config.json
   */
  getClientId() {
    return config.credentials.clientId;
  }

  /*
   * This method returns the Secret from config.json
   */
  getSecret() {
    return config.credentials.secret;
  }

  /*
   * This method returns the oauth url from config.json
   */
  getRedirectURL() {
    return config.credentials.redirectURL;
  }

  /*
   * This method returns the house hold url from config.json
   */
  getHouseHoldURL() {
    return config.apiEndPoints.householdApiURL;
  }

  /*
   * This method returns the groups url from config.json
   */
  getGroupsURL() {
    return config.apiEndPoints.controlApiURL;
  }

  /*
   * This method returns the b64 encoded key secret from config.json
   */
  getB64KeySecretOAuthUrl() {
    return config.credentials.b64EncodedKeySecret;
  }

  /*
   * This method returns the group Id stored in the localStorage
   */
  getHouseHoldIdFromStorage() {
    return window.localStorage.getItem("household_id");
  }

  /*
   * This method returns the B64EncodedKeySecret
   */
  getB64EncodedKeySecret() {
    let clientSecretString = this.getClientId() + ":" + this.getSecret();
    let base64ToStringNew = new Buffer.from(clientSecretString).toString(
      "base64"
    );
    return base64ToStringNew;
  }

  getHeadersBasic() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: "Basic " + this.getB64EncodedKeySecret(),
    };
    return headers;
  }
}

export default Helper;
