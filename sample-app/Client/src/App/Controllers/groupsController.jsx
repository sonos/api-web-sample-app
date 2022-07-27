import React from "react";
import { Component } from "react";
import GroupComponent from "../Components/groupComponent";
import ImageComponent from "../Components/GroupSubComponents/ImageComponent";

class GroupsController extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main_page">
          <div className="logo_logout">
            <div className="logo">
              <ImageComponent src={require("../../images/logo.png")}/>
            </div>
            <div className="logout">
              <ImageComponent src={require("../../images/logout.png")}/>
            </div>
          </div>
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
