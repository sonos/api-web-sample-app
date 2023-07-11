import React from "react";
import { Component } from "react";
import GroupRoutingController from "../Controllers/groupRoutingController";
import HeaderComponent from "./headerComponent";
import BackButton from "./backButtonComponent"

class ListGroupsComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <div className="info_Wrapper">
            <div className="back_button_Wrapper"> 
                <BackButton />
            </div>
            <div className="group_text">
              <p>List of Groups in your Household: </p>
            </div>
          </div>
          {this.props.groups.map((group) => (
            <GroupRoutingController
              key={group.id}
              group={group}
              players={this.props.players}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListGroupsComponent;
