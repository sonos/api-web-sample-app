import axios from "axios";
import Authentication from "../Authentication/authentication";
import config from "../../config.json";

/**
 * Helper class containing various methods commonly used throughout sample application
 */
class Helper {
  constructor() {
    // Used to access currently stored Sonos API access token
    this.authentication = new Authentication();
  }

  /**
   * Sends command to Sonos API and returns result
   * @param endPoint {string} Sonos API command URL
   * @param headers {JSON} Contains Sonos API access token and configuration
   * @param method {string} "POST", "GET", or "DELETE"
   * @param data {JSON} Data to be sent with API command
   * @return {AxiosPromise} Sonos API response
   */
  apiCall(endPoint, headers, method, data) {
    const options = {
      method: method,
      headers: headers,
      data: data,
      url: endPoint
    };
    return axios(options);
  }

  /**
   * Gets header needed for Sonos API calls
   * @return {{Authorization: string, "Content-Type": string}} Currently stored access token, format of response
   */
  getHeaderBearer() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authentication.getAccessToken(),
    };
  }

  /**
   * Retrieves OAuth URL from config.json
   * @return {string} OAuth URL used by login page
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

  /**
   * Retrieves client ID from config.json
   * @return {string} client ID
   */
  getClientId() {
    return config.credentials.clientId;
  }

  /**
   * Retrieves client secret from config.json
   * @return {string} secret
   */
  getSecret() {
    return config.credentials.secret;
  }

  /**
   * Retrieves redirect URL from config.json
   * @return {string} redirect URL
   */
  getRedirectURL() {
    return config.credentials.redirectURL;
  }

  /**
   * Retrieves Sonos API household URL from config.json
   * @return {string} household URL
   */
  getHouseHoldURL() {
    return config.apiEndPoints.householdApiURL;
  }

  /**
   * Retrieves Sonos API group URL from config.json
   * @return {string} group URL
   */
  getGroupsURL() {
    return config.apiEndPoints.controlApiURL;
  }

  /**
   * Retrieves Sonos API player URL from config.json
   * @return {string} player URL
   */
  getPlayersURL() {
    return config.apiEndPoints.playerApiURL;
  }

  /**
   * Calculates and retrieves encoded clientID:secret from config.json
   * @return {string} B64 encoded clientID:secret
   */
  getB64KeySecret() {
    return btoa(config.credentials.clientId + ":" + config.credentials.secret);
  }

  /**
   * Returns header needed to request access token from Sonos API
   * @return {{Authorization: string, "Content-Type": string}} B64 encoded clientID:secret, format of Sonos API response
   */
  getHeadersBasic() {
    return {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: "Basic " + this.getB64KeySecret(),
    };
  }
}

export default Helper;
