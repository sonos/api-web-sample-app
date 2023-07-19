import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";

import ListGroupsComponent from "../Components/listGroupsComponent";

class FetchGroups extends Component {
  state = {
    group_flag: true,
    groups: null,
    players: null,
  };

  group_handler = (input_flag, groups, players) => {
    this.setState({
      group_flag: input_flag,
      groups: groups,
      players: players,
    });
  };

  render() {
    return (
      <div>
        <div className="getHouseholdID">
          {this.state.group_flag && (
            <GetGroups
              household_id={this.props.household_id}
              group_handler={this.group_handler}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div>
          {!this.state.group_flag && (
            <ListGroupsComponent
              groups={this.state.groups}
              players={this.state.players}
              navigate={this.props.navigate}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FetchGroups;
