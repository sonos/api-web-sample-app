import React from "react";
import { Component } from "react";
import GroupComponent from "../Components/groupComponent";
import NavBar from "./navBarController";

class GroupsController extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main_page">
          <NavBar />
          <div className="group_text">
            <p>List of Groups in your Household: </p>
          </div>
          {JSON.parse(window.localStorage.getItem("groups")).map((group) => (
            <GroupComponent key={group.id} group={group}></GroupComponent>
          ))}
        </div>
      </div>
    );
  }
}

export default GroupsController;
