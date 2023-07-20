import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";

import ListGroupsComponent from "../Components/listGroupsComponent";
import GroupsSubscribe from "../UserDetails/groupsSubscribe";

class FetchGroups extends Component {
  constructor(props) {
    super(props);
    this.props.setGroupsInfoState({
      groupFlag: true,
      groups: null,
      players: null
    });
  }
  render() {
    return (
      <div>
        <div className="getHouseholdID">
          {this.props.groupsInfoState.groupFlag && (
            <GetGroups
              householdId={this.props.householdId}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div>
          <GroupsSubscribe householdId= {this.props.householdId}/>
        </div>
        <div>
          {!this.props.groupsInfoState.groupFlag && (
            <ListGroupsComponent
              navigate={this.props.navigate}
              groups={this.props.groupsInfoState.groups}
              players={this.props.groupsInfoState.players}
              householdId={this.props.householdId}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FetchGroups;
