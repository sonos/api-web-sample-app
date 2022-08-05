import React from "react";
import { Component } from "react";
import GroupRoutingController from "../Components/GroupRoutingController";
import HeaderComponent from "../Components/HeaderComponent";

class GroupsController extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main_page">
          <HeaderComponent />
          <div className="group_text">
            <p>List of Groups in your Household: </p>
          </div>
          {JSON.parse(window.localStorage.getItem("groups")).map((group) => (
            <GroupRoutingController key={group.id} group={group}></GroupRoutingController>
          ))}
        </div>
      </div>
    );
  }
}

export default GroupsController;
