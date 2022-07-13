import React from "react";
import { Component } from "react";
import GroupComponent from "../Components/groupComponent";

class GroupsController extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="groups">
          <h1>Groups in your household : </h1>
          <br />

          {JSON.parse(window.localStorage.getItem("groups")).map((group) => (
            <GroupComponent key={group.id} group={group}></GroupComponent>
          ))}
        </div>
      </div>
    );
  }
}

export default GroupsController;
