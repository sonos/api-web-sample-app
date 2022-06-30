import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";
import GetHousehold from "../UserDetails/getHouseholdID";
import GetGroupFlag from "../UserDetails/localStorageHook";
import Groups from "./groupsController";

class FetchUserDetails extends Component {
  state = {
    household_id_flag: true,
    groups_flag: GetGroupFlag("HOUSEHOLD"),
    players_flag: GetGroupFlag("GROUP"),
  };

  hh_handler = (input_flag) => {
    this.setState({
      groups_flag: input_flag,
    });
  };

  group_handler = (input_flag) => {
    this.setState({
      players_flag: input_flag,
    });
  };

  render() {
    return (
      <div>
        <div className="getHouseholdID">
          {!GetGroupFlag("HOUSEHOLD") && this.state.household_id_flag && (
            <GetHousehold hh_handler={this.hh_handler} />
          )}
        </div>

        <div className="getGroups">
          {!GetGroupFlag("GROUP") && this.state.groups_flag && (
            <GetGroups grp_handler={this.group_handler} />
          )}
        </div>

        <div className="loadGroups">
          {this.state.players_flag && <Groups />}
        </div>
      </div>
    );
  }
}

export default FetchUserDetails;
