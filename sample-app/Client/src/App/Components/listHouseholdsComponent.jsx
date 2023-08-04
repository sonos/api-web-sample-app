import React from "react";
import { Component } from "react";
import HouseholdRoutingController from "../Controllers/householdRoutingController";
import HeaderComponent from "./headerComponent";

/**
 * Class component that is given an array of households through props and displays a button for each household
 */
class ListHouseholdsComponent extends Component {
  /**
   * @param props.households {Array} Array of JSON objects each containing information for a household
   * @param props.museCLientConfig {JSON} Contains access token for Sonos API call
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <div className="group_text">
            <p>Households</p>
          </div>
          {/* For each household in this.props.households, a button is created that when clicked, routes the user to that household */}
          {this.props.households.map((household, index) => (
            <HouseholdRoutingController
              key={household.id}
              household={household}
              index={index}
              museClientConfig={this.props.museClientConfig}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListHouseholdsComponent;
