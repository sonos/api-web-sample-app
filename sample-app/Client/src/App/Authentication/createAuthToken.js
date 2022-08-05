import config from "../../config.json";
import Helper from "../Utility/helper";

export default function CreateAuthToken(props) {
  const helper = new Helper();

  let endPoint = config.apiEndPoints.createRefreshAuthTokenURL;

  const headers = helper.getHeadersBasic();

  const data = {
    grant_type: "authorization_code",
    code: props.code,
    redirect_uri: helper.getRedirectURL()
  };

  const dataKeyVal = Object.keys(data)
    .map((key, index) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  helper.apiCall(endPoint, headers, "POST", dataKeyVal)
  .then((authResponse) => {
    props.isLoggedInHandler(true, authResponse.data);
  });
}
