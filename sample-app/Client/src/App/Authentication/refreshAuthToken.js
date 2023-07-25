import Helper from "../Utility/helper";
import config from "../../config.json";

/**
 * Functional component used to retrieve a new access token when access token has become invalid
 * @param props.accessTokenHandler Handler function from RouteComponents that updates status of access token
 */
export default function RefreshAccessToken(props) {
  // Uses Helper apiCall function to call Sonos API
  const helper = new Helper();

  // Gets access token's refresh token from local storage
  let refreshToken = JSON.parse(
    window.localStorage.accessToken
  ).refresh_token;
  let endPoint = config.apiEndPoints.createRefreshAuthTokenURL;

  // Calls Sonos API to request fresh access token
  const HEADER_BASIC = helper.getHeadersBasic();
  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  const dataKeyValue = Object.keys(data)
    .map((key, index) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
  helper.apiCall(endPoint, HEADER_BASIC, "POST", dataKeyValue)
    .then((refreshTokenResponse) => {
      // If access token is successfully retrieved, update the value of the currently stored token and
      // notify RouteComponents that the access token is valid
      if (refreshTokenResponse !== undefined) {
        updateAccessToken(refreshTokenResponse.data);
        props.accessTokenHandler("VALID");
      }
    })
    .catch(function (error) {
      // If access token is not successfully retrieved, notify RouteComponents that the user needs to log in
      console.error(error);
      props.accessTokenHandler("DOES NOT EXIST");
    });
};

/**
 * Sets the stored value of the Sonos API access token
 * @param response Sonos API response when requesting a refreshed access token
 */
function updateAccessToken(response) {
  if (!(response === undefined || response === "")) {
    const accessTokenData = {
      token: response["access_token"],
      refresh_token: response["refresh_token"],
      token_type: response["token_type"],
      expiry: response["expires_in"],
      tokenTimestamp: Math.floor(Date.now() / 1000),
    };

    // Can be accessed from other pages within the sample app
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify(accessTokenData)
    );
  }
}
