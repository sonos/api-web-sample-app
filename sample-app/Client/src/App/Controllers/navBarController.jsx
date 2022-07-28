import React from "react";
import { Component } from "react";
import ImageComponent from "../Components/GroupSubComponents/ImageComponent";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="logo_logout">
        <div className="logo">
          <ImageComponent src={require("../../images/logo.png")} />
        </div>
        <div className="logout">
          <ImageComponent src={require("../../images/logout.png")} />
        </div>
      </div>
    );
  }
}

export default NavBar;
