import React from "react";
import { Component } from "react";
import { Configuration } from "../museClient/configuration";
import GetHouseholds from "../UserDetails/getHouseholds";
import ListHouseholdsComponent from "../Components/listHouseholdsComponent";


/**
 * Class component that fetches and displays list of all households associated with user
 */
class FetchHouseholds extends Component {
  // Default value for householdFlag causes households to be fetched on instantiation
  state = {
    householdFlag: true,
    households: null,
  };

  /**
   * Handler function to update state of FetchHouseholds. Passed through props to GetHouseholds
   * @param householdsResponse {Array} List of households fetched from Sonos API
   */
  hh_handler = (householdsResponse) => {
    this.setState({
      householdFlag: false,
      households: householdsResponse,
    });
  };

  render() {
    // Contains access token needed for Sonos API calls
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });

    // First calls GetHouseholds, which updates this.state to contain a list of households associated with user and sets state.householdFlag to false
    // GetHouseholds then is unmounted and ListHouseholdsComponent is instantiated, which displays a button for each household
    return (
      <div>
        <div className="getHouseholdID">
          {this.state.householdFlag && (
            <GetHouseholds
              hh_handler={this.hh_handler}
              museClientConfig={museClientConfig}
            />
          )}
        </div>
        <div>
          {!this.state.householdFlag && (
            <ListHouseholdsComponent households={this.state.households} museClientConfig={museClientConfig}/>
          )}
        </div>
      </div>
    );
  }
}

export default FetchHouseholds;
