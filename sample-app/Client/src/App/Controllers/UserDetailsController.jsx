import React from "react";
import { Component } from "react";
import Groups from "../UserDetails/Groups";
import Household from "../UserDetails/HouseholdID";
import GetGroupFlag from "../UserDetails/localStorageHook";
import GroupsController from "./groupsController";
import Subscribe from "../UserDetails/subscribe";

class UserDetails extends Component {
  state = {
    household_id_flag: true,
    groups_flag: GetGroupFlag("HOUSEHOLD"),
    subscribe_flag: false,
    players_flag: GetGroupFlag("GROUP")
  };

  hh_handler = (input_flag) => {
    this.setState({
      groups_flag: input_flag,
    });
  };

  group_handler = (input_flag) => {
    this.setState({
      subscribe_flag: input_flag
    });
  };

  subscribe_handler = (input_flag) => {
    this.setState({
      players_flag : input_flag
    })
  }
 
  render() {
    return (
      <div>
        <div className="getHouseholdID">
          {!GetGroupFlag("HOUSEHOLD") && this.state.household_id_flag && (
            <Household hh_handler={this.hh_handler} />
          )}
        </div>

        <div className="getGroups">
          {!GetGroupFlag("GROUP") && this.state.groups_flag && (
            <Groups grp_handler={this.group_handler} />
          )}
        </div>

        <div className="subscribe">
          {this.state.subscribe_flag && (
            <Subscribe subscribe_handler={this.subscribe_handler} />
          )}
        </div>

        <div className="loadGroups">
          {this.state.players_flag && <GroupsController />}
        </div>
      </div>
    );
  }
}

export default UserDetails;
