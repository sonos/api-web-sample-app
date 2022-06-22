import React from "react";
import { Component } from "react";
import GetGroupID from "../UserDetails/getGroupID";
import GetHousehold from "../UserDetails/getHouseholdID";
import Player from "./playerComponent";


class FetchUserDetails extends Component {
  state = {
    household_id_flag: true,
    group_id_flag: !((window.localStorage.household_id === undefined) || (window.localStorage.household_id === "")),
    household_id : window.localStorage.household_id,
    group_id : window.localStorage.group_id,
    players : window.localStorage.players
  };

  hh_handler = (input_flag, hh_id) => {
    console.log("Setting group ID flag to : ", input_flag);
    this.setState({
      group_id_flag: input_flag,
      household_id : hh_id
    });
  };


  group_handler = (grp_id, players_data) => {
    this.setState({
      group_id : grp_id,
      players : players_data
    });
  };

  render() {
    return (
      <div>

        {console.log("Household_id is : ",window.localStorage.household_id)}
        {console.log("Group_id is : ", window.localStorage.group_id)}
        {console.log("players is: ", window.localStorage.players)}

        <div className="getHouseholdID">
          {
            ((window.localStorage.household_id === undefined || window.localStorage.household_id === "") && 
            (this.state.household_id_flag)) && (
              <GetHousehold
                household_id_flag={this.state.household_id_flag}
                hh_handler={this.hh_handler}
              />
            )}
        </div>

        <div className="getGroupID">
          {(window.localStorage.group_id === undefined || window.localStorage.group_id === "") && 
          this.state.group_id_flag && (
          <GetGroupID 
            grp_handler={this.group_handler}
          />
          )}
        </div>

        <div className="loadPlayer">
          {this.state.group_id_flag && <Player />}
        </div>
      </div>
    );
  }
}

export default FetchUserDetails;
