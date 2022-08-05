import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";

import PlayBackMetadataComponent from "../Components/GroupSubComponents/PlaybackMetadataComponent";
import PlaybackToggleComponent from "../Components/GroupSubComponents/PlaybackToggleComponent";
import VolumeComponent from "../Components/GroupSubComponents/VolumeComponent";
import PlayersController from "./PlayersController";
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
            museClientConfig={this.props.museClientConfig}
          />
          <div className="group_buttons">
            <div className="group_prev" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlaybackToggleComponent
              groupID={this.group.id}
              playPauseState={false}
              museClientConfig={this.props.museClientConfig}
            />

            <div className="group_next" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <p className="group_volume">Group Volume:</p>
          <VolumeComponent
            groupID={this.group.id}
            museClientConfig={this.props.museClientConfig}
          />
        </div>
      </div>
      <div className="players_page">
        <PlayersController group={this.props.group} 
        museClientConfig = {this.props.museClientConfig}
      />
      </div>

        <div className="players_component">
          <div className="player_name">
            <div className="player_box">
              <div className="player_text">Players</div>
            </div>
          </div>
          <PlayersController
            group={this.props.group}
            museClientConfig={this.props.museClientConfig}
          />
        </div>
      </div>
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

export default GroupPlayersController;
