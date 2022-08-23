import React from "react";
import { Component } from "react";
import { Configuration } from "../museClient/configuration";
import GetHousehold from "../UserDetails/getHouseholdID";
import ListHouseholdsComponent from "../Components/listHouseholdsComponent";

class FetchHouseholds extends Component {
  state = {
    household_flag: true,
    households: null,
  };

  hh_handler = (input_flag, householdsResponse) => {
    this.setState({
      household_flag: input_flag,
      households: householdsResponse,
    });
  };

  render() {
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });

    return (
      <div>
        <div className="getHouseholdID">
          {this.state.household_flag && (
            <GetHousehold
              hh_handler={this.hh_handler}
              museClientConfig={museClientConfig}
            />
          )}
        </div>
        <div>
          {!this.state.household_flag && (
            <ListHouseholdsComponent households={this.state.households} />
          )}
        </div>
      </div>
    );
  }
}

export default FetchHouseholds;
