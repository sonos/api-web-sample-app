import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";

import PlayBackMetaDataComponent from "./GroupSubComponents/playBackMetaDataComponent";
import PlayBackStateButton from "./GroupSubComponents/playBackStateButton";
import VolumeComponent from "./GroupSubComponents/volumeComponent";
import PlayersComponent from "../Controllers/playersController";
import ImageComponent from "./GroupSubComponents/ImageComponent";

class Control extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
  }

  render() {
    this.group = JSON.parse(this.props.group);
    {
      console.log("Loading Groups Component...");
    }

    return (

      <div className="main_page">
          <div className="logo_logout">
            <div className="logo">
              <ImageComponent src={require("../../images/logo.png")}/>
            </div>
            <div className="logout">
              <ImageComponent src={require("../../images/logout.png")}/>
            </div>
          </div>
          
          <div className="group_name">
            <div className="group_box">
              <p>{this.group.name} </p>
            </div>
          </div>

          <PlayBackMetaDataComponent groupID={this.group.id} />
          <div className="group_buttons">
            <div className="group_prev" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlayBackStateButton groupID={this.group.id} playPauseState={false}/>

            <div className="group_next" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>
          {/*<div className="buttons">
            <div className="prev-track" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlayBackStateButton groupID={this.group.id} playPauseState={false}/>

            <div className="next-track" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>*/}

          <VolumeComponent groupID={this.group.id} />

          <PlayersComponent group={this.props.group} />
      </div>
      /*<div className="player">
        <div>
          <h1 className="oauthtext">Group Name: {this.group.name}</h1>
        </div>

        <PlayBackMetaDataComponent groupID={this.group.id} />

        <div className="buttons">
          <div className="prev-track" onClick={this.skipToPrevious}>
            <i className="fa fa-step-backward fa-2x"></i>
          </div>

          <PlayBackStateButton groupID={this.group.id} playPauseState={false}/>

          <div className="next-track" onClick={this.skipToNext}>
            <i className="fa fa-step-forward fa-2x"></i>
          </div>
        </div>

        <VolumeComponent groupID={this.group.id} />

        <PlayersComponent group={this.props.group} />
      </div>*/
    );
  }

  skipToPrevious = () => {
    console.debug("Trying to skip to previous song...");
    this.ControlOptions.helperControls("skipToPreviousTrack", this.group.id);
  };

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
    this.ControlOptions.helperControls("skipToNextTrack", this.group.id);
  };
}

export default Control;
