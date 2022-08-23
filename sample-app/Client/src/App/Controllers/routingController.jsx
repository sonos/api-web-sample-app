import React from "react";
import { Component } from "react";

import Authentication from "../Authentication/authentication";
import FetchHouseholds from "./fetchHouseholdsController";
import OAuthController from "./oAuthController";


class RouteComponents extends Component {
  state = { is_logged_in: new Authentication().isAccessTokenValid()};

  access_token_handler = (flag, museClientConfig) => {
    this.setState({ is_logged_in: flag});
  };

  render() {
    return (
      <div>
        {!this.state.is_logged_in && (
          <OAuthController
            access_token_handler={this.access_token_handler}
            is_logged_in={this.state.is_logged_in}
          />
        )}    
        {this.state.is_logged_in && <FetchHouseholds/>}
      </div>
    );
  }
}

export default RouteComponents;
