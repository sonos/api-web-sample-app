import React, { Component } from "react";
import Authentication from "../Authentication/authentication";
import CreateAuthToken from "../Authentication/createAuthToken";
import Helper from "../Utility/helper";

export default class OAuth extends Component {
  constructor() {
    super();
    this.code_generated_flag = false;
    this.auth = new Authentication();
    this.code = null;
    this.helper = new Helper();
  }

  getCode = () => {
    // Checking whether the URL contains the param code
    let cur_url = window.location.href;
    const params = new URLSearchParams(cur_url);
    const code_generated = params.get("code");

    if (code_generated !== null) {
      this.code_generated_flag = true;
      this.code = code_generated;
      return true;
    } else {
      this.props.access_token_handler(false);
      return false;
    }
  };

  isLoggedInHandler = (flag, response) => {
    const access_token_data = {
      token: response["access_token"],
      refresh_token: response["refresh_token"],
      token_type: response["token_type"],
      expiry: response["expires_in"],
      token_timestamp: Math.floor(Date.now() / 1000),
    };

    window.localStorage.setItem(
      "access_token",
      JSON.stringify(access_token_data)
    );

    this.props.access_token_handler(flag);
  };

  render() {
    return (
      <div>
        <div className="login_to_sonos" align="center">
          {this.getCode()}
          <div>
            <h1 className="oauthtext">Login with Sonos</h1>
          </div>
          <div>
            <img src={require("../../images/sonos.png")} alt="Sonos" width="300" height="200"></img>
          </div>
          <div>
            <a href={this.helper.getOAuthUrl()} className="oauthhref">
              <br />
              <button type="button" className="btn btn-info">
                Login
              </button>
            </a>
          </div>
          <div>
            {this.code_generated_flag && (
              <CreateAuthToken
                b64_encoded_string={this.helper.getB64KeySecretOAuthUrl()}
                code={this.code}
                isLoggedInHandler={this.isLoggedInHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
