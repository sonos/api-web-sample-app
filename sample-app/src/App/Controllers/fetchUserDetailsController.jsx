import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";
import GetHousehold from "../UserDetails/getHouseholdID";
import Groups from "./groupsController";

class FetchUserDetails extends Component {
  state = {
    household_id_flag: true,
    groups_flag: !(
      window.localStorage.household_id === undefined ||
      window.localStorage.household_id === ""
    ),
    players_flag: !(
      window.localStorage.groups === undefined ||
      window.localStorage.groups === ""
    ),
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
          {(window.localStorage.household_id === undefined ||
            window.localStorage.household_id === "") &&
            this.state.household_id_flag && (
              <GetHousehold hh_handler={this.hh_handler} />
            )}
        </div>

        <div className="getGroups">
          {(window.localStorage.groups === undefined ||
            window.localStorage.groups === "") &&
            this.state.groups_flag && (
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
