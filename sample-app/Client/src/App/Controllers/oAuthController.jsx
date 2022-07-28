import React, { Component, useState } from "react";
import Authentication from "../Authentication/authentication";
import CreateAuthToken from "../Authentication/createAuthToken";
import Helper from "../Utility/helper";
import ImageComponent from "../Components/GroupSubComponents/ImageComponent";

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

  postYourAdd = () => {
    document.getElementById("iframeDisplay").innerHTML =
      '<iframe src="../HtmlPage1.html" height="200" width="300" ></iframe>';
  };
  render() {
    return (
      <div className="background">
        <div className="main_page">
          <div className="oauth_bkg">
            <ImageComponent
              src={require("../../images/sonos_background.png")}
            />
          </div>
          {this.getCode()}
          <div className="login_with_sonos_text">
            <p>Login with Sonos</p>
          </div>

          <div>
            <a href={this.helper.getOAuthUrl()} className="oauthhref">
              <button type="button" className="login_btn">
                Login
              </button>
            </a>
            {/*<iframe style={{ borderStyle: "none" }} data-test="authModal" src="about:blank" title="test" width="100%" height="100%" loading="lazy" />*/}
          </div>
        </div>
        <div className="login_to_sonos" align="center">
          <div>
            <img
              src={require("../../images/sonos.png")}
              alt="Sonos"
              width="300"
              height="200"
            ></img>
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
