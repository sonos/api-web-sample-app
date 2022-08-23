import React from "react";
import { Component } from "react";
import HouseholdRoutingController from "../Controllers/householdsRoutingController";
import HeaderComponent from "./headerComponent";

class ListHouseholdsComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <div className="group_text">
            <p>List of Households: </p>
          </div>
          {this.props.households.map((household, index) => (
            <HouseholdRoutingController
              key={household.id}
              household={household}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListHouseholdsComponent;
