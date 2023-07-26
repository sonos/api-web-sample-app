import config from "../../config.json";
import Helper from "../Utility/helper";

/**
 * Functional component that fetches access token from Sonos API using previously retrieved code
 * @param props.code {string} Code retrieved from logging into Sonos account
 * @param props.isLoggedInHandler Handler function that updates access token in oAuthController and status in RouteComponents
 */
export default function CreateAuthToken(props) {
  // Helper class contains various helper methods for use throughout the application
  const helper = new Helper();

  // URL to fetch new auth token
  let endPoint = config.apiEndPoints.createRefreshAuthTokenURL;

  // Header containing encoded clientId and secret
  const headers = helper.getHeadersBasic();

  // Calls Sonos API and updates access token value
  const data = {
    grant_type: "authorization_code",
    code: props.code,
    redirect_uri: helper.getRedirectURL(),
  };
  const dataKeyVal = Object.keys(data)
    .map((key, index) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");
  helper.apiCall(endPoint, headers, "POST", dataKeyVal).then((authResponse) => {
    props.isLoggedInHandler(true, authResponse.data);
  });
}
