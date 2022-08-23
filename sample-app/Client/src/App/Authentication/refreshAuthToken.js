/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 */

import Helper from "../Utility/helper";
import config from "../../config.json";

class RefreshAuthToken {
  /*
   * This method internally calls the refresh token api
   */
  refreshAccessToken = () => {
    const helper = new Helper();

    let refreshToken = JSON.parse(
      window.localStorage.accessToken
    ).refresh_token;
    let endPoint = config.apiEndPoints.createRefreshAuthTokenURL;

    const HEADER_BASIC = helper.getHeadersBasic();

    const data = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    const dataKeyValue = Object.keys(data)
      .map((key, index) => `${key}=${encodeURIComponent(data[key])}`)
      .join("&");
    helper
      .apiCall(endPoint, HEADER_BASIC, "POST", dataKeyValue)
      .then((refreshTokenResponse) => {
        if (
          !(refreshTokenResponse === undefined || refreshTokenResponse === "")
        ) {
          this.updateRefreshToken(refreshTokenResponse);
        }
      })
      .catch(function (error) {
        helper.logError(error);
      });

    return refreshToken;
  };

  /*
   * This method updates the token object in the local storage cache
   */
  updateRefreshToken(response) {
    const helper = new Helper();

    if (!(response.data === undefined || response.data === "")) {
      const accessTokenData = {
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        token_type: response.data.token_type,
        expiry: response.data.expiry,
        tokenTimestamp: response.data.token_timestamp,
      };
      helper.setAccessTokeDatainStorage(accessTokenData);
    }
  }
}

export default RefreshAuthToken;
