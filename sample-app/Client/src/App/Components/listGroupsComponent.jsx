import React from "react";
import { Component } from "react";
import GroupRoutingController from "../Controllers/groupRoutingController";
import HeaderComponent from "./headerComponent";
import BackButton from "./backButtonComponent"

/**
 * Class component that is given an array of groups through props and displays a button for each group
 */
class ListGroupsComponent extends Component {
  /**
   * @param props.navigate Used by BackButton to navigate to previous page
   * @param props.groups {JSON} Each attribute is a group ID and each value is a JSON object with information for that group
   * @param props.players {Array} Array of JSON objects with each containing information for a player
   * @param props.householdId {string} Needed for subscribing to the current household's groups events upon reaching the group playback page
   */
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <BackButton navigate={this.props.navigate} />
          <div className="group_text">
            <p>Groups</p>
          </div>
          {/* For each group in this.props.groups, a button is created that when clicked, routes user to group playback page */}
          {Object.keys(this.props.groups).map((key) => (
            <GroupRoutingController
              key={key}
              householdId={this.props.householdId}
              group={this.props.groups[key]}
              players={this.props.players}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListGroupsComponent;
