import React from "react";
import { Component } from "react";

import Authentication from "../Authentication/authentication";
import OAuth from "./oAuthController";
import UserDetails from "./UserDetailsController";

class RouteComponents extends Component {
  state = { is_logged_in: new Authentication().isAccessTokenValid() };

  access_token_handler = (flag) => {
    this.setState({ is_logged_in: flag });
  };

  render() {
    return (
      <div>
        {!this.state.is_logged_in && (
          <OAuth
            access_token_handler={this.access_token_handler}
            is_logged_in={this.state.is_logged_in}
          />
        )}
        {this.state.is_logged_in && <UserDetails />}
      </div>
    );
  }
}

export default RouteComponents;
