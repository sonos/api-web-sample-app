import React from "react";
import { Component } from "react";
import GetGroups from "../UserDetails/getGroups";
import ListGroupsComponent from "../Components/listGroupsComponent";
import GroupsSubscribe from "../UserDetails/groupsSubscribe";

/**
 * Class component that fetches and displays list of all groups in selected household
 */
class FetchGroups extends Component {
  /**
   * @param props.setGroupsInfoState Modifies state of groupsInfoAtom, which contains information on groups, players, and household ID
   * @param props.groupsInfoState {JSON} Accesses state of groupsInfoAtom
   * @param props.householdId {string} Used to target specific household in Sonos API calls
   * @param props.museClientConfig {JSON} Contains Sonos API access token
   */
  constructor(props) {
    super(props);
    // Default value for groupFlag causes groups to be fetched on instantiation
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
          {/* Upon instantiation, fetches groups information from Sonos API and sets groupFlag to false */}
          {this.props.groupsInfoState.groupFlag && (
            <GetGroups
              householdId={this.props.householdId}
              museClientConfig={this.props.museClientConfig}
              setGroup={false}
              showLoadingScreen={true}
            />
          )}
        </div>
        <div>
          {/*
            Subscribes to groups events for the current household
            Any groups change events received cause this component to be re-rendered with the new information
           */}
          <GroupsSubscribe householdId= {this.props.householdId}/>
        </div>
        <div>
          {/* Once groups information has been fetched, a button that routes user to group player page is created for each group */}
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
