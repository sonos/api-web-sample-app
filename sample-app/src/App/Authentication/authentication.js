import { Component } from "react";

class Authentication extends Component {
  isAccessTokenValid = () => {
    let accessToken = window.localStorage.access_token;
    if (accessToken === undefined || accessToken === "") {
      return false;
    } else {
      let cur_time = Math.floor(Date.now() / 1000);
      accessToken = JSON.parse(accessToken);
      return !(cur_time - accessToken.token_timestamp >= accessToken.expiry);
    }
  };

  get_access_token = () => {
    let accessToken = JSON.parse(window.localStorage.access_token).token;
    return accessToken;
  };
}

export default Authentication;
