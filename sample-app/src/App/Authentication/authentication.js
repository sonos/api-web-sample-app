import { Component } from "react";

class Authentication extends Component {
  isAccessTokenValid = () => {
    let access_token = window.localStorage.access_token;
    if (access_token === undefined || access_token === "") {
      return false;
    } else {
      let cur_time = Math.floor(Date.now() / 1000);
      access_token = JSON.parse(access_token);
      return !(cur_time - access_token.token_timestamp >= access_token.expiry);
    }
  };

  get_access_token = () => {
    let auth_token = JSON.parse(window.localStorage.access_token).token;
    return auth_token;
  };
}

export default Authentication;
