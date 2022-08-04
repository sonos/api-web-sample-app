import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";

import PlayBackMetadataComponent from "../Components/GroupSubComponents/PlayBackMetadataComponent";
import PlaybackToggleComponent from "../Components/GroupSubComponents/PlaybackToggleComponent";
import VolumeComponent from "../Components/GroupSubComponents/volumeComponent";
import PlayersComponent from "./playersController";
import HeaderComponent from "../Components/HeaderComponent";

class GroupPlayersController extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
  }

  render() {
    this.group = JSON.parse(this.props.group);

    return (
      <div>
      <div className="main_page">
        <HeaderComponent />

        <div className="group_name">
          <div className="group_box">
            <p>{this.group.name} </p>
          </div>
        </div>

        <div className="player">
          <PlayBackMetadataComponent
            groupID={this.group.id}
            museClientConfig = {this.props.museClientConfig}
          />
          <div className="group_buttons">
            <div className="group_prev" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlaybackToggleComponent
              groupID={this.group.id}
              playPauseState={false}
              museClientConfig = {this.props.museClientConfig}
            />

            <div className="group_next" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <VolumeComponent groupID={this.group.id} 
            museClientConfig = {this.props.museClientConfig}
          />
        </div>
      </div>
      <div className="players_page">
        <PlayersComponent group={this.props.group} 
        museClientConfig = {this.props.museClientConfig}
      />
      </div>

      </div>
    );
  }

  skipToPrevious = () => {
    console.debug("Trying to skip to previous song...");
    this.ControlOptions.helperControls("skipToPreviousTrack", this.group.id, this.props.museClientConfig);
  };

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
    this.ControlOptions.helperControls("skipToNextTrack", this.group.id, this.props.museClientConfig);

  };
}

export default GroupPlayersController;
