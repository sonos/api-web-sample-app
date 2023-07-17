import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";

import ListGroupsComponent from "../Components/listGroupsComponent";
import GroupsSubscribe from "../UserDetails/groupsSubscribe";

class FetchGroups extends Component {
  constructor(props) {
    super(props);
    this.props.setGroupsInfoState({
      group_flag: true,
      groups: null,
      players: null
    });
  }
  render() {
    return (
      <div>
        <div className="getHouseholdID">
          {this.props.groupsInfoState.group_flag && (
            <GetGroups
              householdID={this.props.household_id}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div>
          <GroupsSubscribe
            householdID= {this.props.household_id}
          />
        </div>
        <div>
          {!this.props.groupsInfoState.group_flag && (
            <ListGroupsComponent
              navigate={this.props.navigate}
              groups={this.props.groupsInfoState.groups}
              players={this.props.groupsInfoState.players}
              householdID={this.props.household_id}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FetchGroups;
