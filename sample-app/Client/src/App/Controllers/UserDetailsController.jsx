import React from "react";
import { Component } from "react";
import Groups from "../UserDetails/fetchGroups";
import Household from "../UserDetails/fetchHouseholdID";
import GetGroupFlag from "../UserDetails/localStorageHook";
import GroupRoutingController from "./groupRoutingController";
import Subscribe from "../UserDetails/subscribe";
import { Configuration } from "../museClient/configuration";

class UserDetailsController extends Component {
  state = {
    household_id_flag: true,
    groups_flag: GetGroupFlag("HOUSEHOLD"),
    subscribe_flag: false,
    players_flag: GetGroupFlag("GROUP"),
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
            <Household hh_handler={this.hh_handler}
             museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>

        <div className="getGroups">
          {!GetGroupFlag("GROUP") && this.state.groups_flag && (
            <Groups grp_handler={this.group_handler}
             museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>

        <div className="subscribe">
          {this.state.subscribe_flag && (
            <Subscribe subscribe_handler={this.subscribe_handler}
              museClientConfig={this.props.museClientConfig}
            />

          )}
        </div>

        <div className="loadGroups">
          {this.state.players_flag && <GroupRoutingController />}
        </div>
      </div>
    );
  }
}

export default UserDetailsController;
