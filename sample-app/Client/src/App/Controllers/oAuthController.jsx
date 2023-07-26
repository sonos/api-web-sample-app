import React, { Component } from "react";
import CreateAuthToken from "../Authentication/createAuthToken";
import Helper from "../Utility/helper";
import ImageComponent from "../Components/GroupSubComponents/imageComponent";

/**
 * Class component that displays login page, which contains a button that when clicked, routes user to Sonos login page
 * Upon successful login, access token is generated and passed into the handler function passed through props
 * User stays on login page until login is successful
 */
export default class OAuthController extends Component {
  /**
   * @param props.accessTokenHandler Handler function that updates access token status in RouteComponents
   */
  constructor(props) {
    super(props);

    // When code is generated, this is set to true and auth token is created
    this.codeGeneratedFlag = false;

    // Needed to get access token from Sonos API
    this.code = null;

    // Helper class contains various helper methods for use throughout the application
    this.helper = new Helper();
  }

  /**
   * Gets param code and sets this.code and this.codeGeneratedFlag
   * Called before CreateAuthToken, as CreateAuthToken depends on the param code
   */
  getCode = () => {
    // Gets param code from current URL for later use in getting access token from Sonos API
    // Param code is generated when Sonos login is completed
    let cur_url = window.location.href;
    const params = new URLSearchParams(cur_url);
    const code_generated = params.get("code");

    // If param code was successfully retrieved, sets code value and sets codeGeneratedFlag to true, causing CreateAuthToken to be called
    // Otherwise, signals to routingController that it should retry authentication
    if (code_generated !== null) {
      this.codeGeneratedFlag = true;
      this.code = code_generated;
    } else {
      this.props.accessTokenHandler("DOES NOT EXIST");
    }
  };

  /**
   * Passed through props to CreateAuthToken
   * Sets value of access token status in RouteComponents by calling accessTokenHandler function passed through props
   * @param flag {boolean} True if user has logged in, false otherwise
   * @param response {JSON} Sonos API response from CreateAuthToken
   */
  isLoggedInHandler = (flag, response) => {
    // Data retrieved from CreateAuthToken that is to be stored in the current window
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

    // Updates access token value in RouteComponents
    this.props.accessTokenHandler(flag ? "VALID" : "DOES NOT EXIST");
  };

  render() {
    // Gets param code first since it is needed for authentication
    this.getCode();
    return (
      // Displays login page
      <div className="background">
        <div className="main_page">
          <div className="oauth_bkg">
            <ImageComponent
              src={require("../../images/sonos_background.png")}
            />
          </div>
          <div className="login_with_sonos_text">
            <p>Login with Sonos</p>
          </div>
          <div>
            {/* Login button that when clicked, takes user to Sonos login URL */}
            <a href={this.helper.getOAuthUrl()} className="oauthhref">
              <button type="button" className="login_btn">
                Login
              </button>
            </a>
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
            {/* When param code is retrieved, auth token is created and value in RouteComponents is updated */}
            {this.codeGeneratedFlag && (
              <CreateAuthToken
                b64_encoded_string={this.helper.getB64KeySecret()}
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
