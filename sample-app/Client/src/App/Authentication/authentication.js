import {Component} from "react";

/**
 * Class component that can check if locally stored access token is valid and retrieve the stored access token
 */
class Authentication extends Component {
  /**
   * Checks if access token exists and if so, checks if it is expired or still valid
   * @returns {string} "DOES NOT EXIST", "VALID", or "EXPIRED"
   */
  getAccessTokenState = () => {
    // Retrieves stored access token
    let accessToken = window.localStorage.accessToken;

    // If access token does not exist, user will have to log in to Sonos account
    if (accessToken === undefined || accessToken === "") {
      return "DOES NOT EXIST";
    } else {
      // Checks if access token is expired
      let curTime = Math.floor(Date.now() / 1000);
      accessToken = JSON.parse(accessToken);
      if (!this.checkAccessTokenExpired(curTime, accessToken)) {
        // User can continue to households page
        return "VALID";
      } else {
        // Access token needs to be refreshed
        return "EXPIRED";
      }
    }
  };

  /**
   * Checks if current access token is valid
   * @return {boolean} True if access token is valid, false otherwise
   */
  isAccessTokenValid = () => {
    return this.getAccessTokenState() === "VALID";
  }

  /**
   * Retrieves and returns access token from local storage
   * @returns {JSON} Access token
   */
  getAccessToken = () => {
    return JSON.parse(window.localStorage.accessToken).token;
  };

  /**
   * Uses current timestamp, access token's timestamp, and access token time until expiration to check if token is expired
   */
  checkAccessTokenExpired(curTime, accessToken) {
    return curTime - accessToken.tokenTimestamp >= accessToken.expiry;
  }
}

export default Authentication;
