import React from "react";
import { Component } from "react";
import Authentication from "../Authentication/authentication";
import FetchHouseholds from "./fetchHouseholdsController";
import OAuthController from "./oAuthController";
import RefreshAccessToken from "../Authentication/refreshAuthToken";

/**
 * When navigating to http://localhost:3000, user is taken to this component
 * If user is already logged in, households page is displayed
 * Otherwise, access token is refreshed or login page is displayed
 */
class RouteComponents extends Component {
  constructor(props) {
    super(props);

    // Checks local storage for access token. If token is expired, authStatus is "EXPIRED",
    // If token does not exist, authStatus is "DOES NOT EXIST". Otherwise, authStatus is "VALID"
    this.state = {authStatus: new Authentication().getAccessTokenState()};
  }

  /**
   * Handler function passed through props to OAuthController and RefreshAccessToken. Updates state.authStatus
   * @param status {string} New value for state.authStatus
   */
  accessTokenHandler = (status) => {
    this.setState({ authStatus: status});
  };

  render() {
    // If access token is expired, refresh access token
    // If access token does not exist, display login page
    // If access token is valid, continue to households display
    return (
      <div>
        {this.state.authStatus === "EXPIRED" && (
          <RefreshAccessToken
            accessTokenHandler={this.accessTokenHandler}
          />
        )}
        {this.state.authStatus === "DOES NOT EXIST" && (
          <OAuthController
            accessTokenHandler={this.accessTokenHandler}
          />
        )}
        {this.state.authStatus === "VALID" && <FetchHouseholds/>}
      </div>
    );
  }
}

export default RouteComponents;
