import config from "../../config.json";
import Helper from "../Utility/helper";
import { HEADER_BASIC, METHOD_POST } from "../Utility/constants";


export default function CreateAuthToken(props) {
  const helper = new Helper();
  
  let mounted = true;

  let endPoint = config.api_end_points.create_refresh_auth_token_url;

  const headers = HEADER_BASIC;

  const data_ = {
    grant_type: "authorization_code",
    code: props.code,
    redirect_uri: helper.getRedirectURL()
  };

  const data = Object.keys(data_)
    .map((key, index) => `${key}=${encodeURIComponent(data_[key])}`)
    .join("&");

  helper.apiCall(endPoint, headers, METHOD_POST, data)
  .then((res) => {
    props.is_logged_in_handler(true, res.data);
  });
}
