import React from "react";
import { Component } from "react";

import HelperControls from "../ControlAPIs/playerControls";
import Subscribe from "../UserDetails/subscribe";
import PlaybackMetaDataComponentWrapper from "./GroupSubComponents/PlaybackMetaDataComponentWrapper";
import PlayBackStateButtonWrapper from "./GroupSubComponents/PlaybackStateButtonWrapper";
import VolumeComponentWrapper from "./GroupSubComponents/VolumeComponentWrapper";
import PlayersController from "../Controllers/playersController";
import HeaderComponent from "./headerComponent";
import BackButton from "./backButtonComponent"

class GroupPlayersComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
  }

  render() {
    this.group = JSON.parse(this.props.group);

    return (
      <div className="selected_group_page">
        <div className="subscribe">
          <Subscribe
            museClientConfig={this.props.museClientConfig}
            groupID={this.group.id}
          />
        </div>

        <HeaderComponent />

        <div className="group_name">
          <div className="back_button_Wrapper"> 
            <BackButton />
          </div>
          <div className="group_box">
            <p>{this.group.name} </p>
          </div>
        </div>

        <div className="player">
          <PlaybackMetaDataComponentWrapper
            groupID={this.group.id}
            museClientConfig={this.props.museClientConfig}
          />
          <div className="group_buttons">
            <div className="group_prev" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlayBackStateButtonWrapper
              groupID={this.group.id}
              museClientConfig={this.props.museClientConfig}
            />

            <div className="group_next" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <p className="group_volume">Group Volume:</p>
          <VolumeComponentWrapper
            groupID={this.group.id}
            museClientConfig={this.props.museClientConfig}
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
            players={this.props.players}
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

export default GroupPlayersComponent;
