import React from "react";
import { Component } from "react";
import GroupRoutingController from "../Controllers/groupRoutingController";
import HeaderComponent from "./headerComponent";
import BackButton from "./backButtonComponent"

class ListGroupsComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <div className="info_Wrapper">
            <div className="back_button_Wrapper"> 
                <BackButton navigate={this.props.navigate} />
            </div>
            <div className="group_text">
              <p>List of Groups in your Household: </p>
            </div>
          </div>
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
