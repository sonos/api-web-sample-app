import React from "react";
import { Component } from "react";

import HelperControls from "../ControlAPIs/playerControls";
import Subscribe from "../UserDetails/subscribe";
import PlaybackMetaDataComponentWrapper from "./GroupSubComponents/PlaybackMetaDataComponentWrapper";
import PlayBackStateButtonWrapper from "./GroupSubComponents/PlaybackStateButtonWrapper";
import VolumeComponentWrapper from "./GroupSubComponents/VolumeComponentWrapper";
import PlayersController from "../Controllers/playersController";
import HeaderComponent from "./headerComponent";
import GroupGoneRoutingController from "../Controllers/groupGoneRoutingController";
import BackButton from "./backButtonComponent"
import SkipToPreviousController from "../Controllers/skipToPreviousController";
import GetGroups from "../UserDetails/getGroups";

class GroupPlayersComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
  }

  render() {
    return (
      <div className="selected_group_page">
        <div className="subscribe">
          <Subscribe
            museClientConfig={this.props.museClientConfig}
            groupID={this.props.groupID}
          />
        </div>

        {this.props.groupsInfoState.group_flag && (
          <GetGroups
            householdID={this.props.householdID}
            museClientConfig={this.props.museClientConfig}
            setGroup={true}
            groupID={this.props.groupID}
          />
        )}

        {this.props.state.groupGoneFlag && (
          <GroupGoneRoutingController
            navigate={this.props.navigate}
          />
        )}

        <HeaderComponent />

        {this.props.skipBack && (
          <SkipToPreviousController
            setSkipBack={this.props.setSkipBack}
            groupID={this.props.groupID}
            museClientConfig={this.props.museClientConfig}
          />
        )}

        <div className="group_name">
          <div className="back_button_Wrapper">
            <BackButton
              navigate={this.props.navigate}
            />
          </div>
          <div className="group_box">
            <p>{this.props.state.groupName} </p>
          </div>
        </div>

        <div className="player">
          <PlaybackMetaDataComponentWrapper
            groupID={this.props.groupID}
            museClientConfig={this.props.museClientConfig}
          />
          <div className="group_buttons">
            <div className="group_prev" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlayBackStateButtonWrapper
              groupID={this.props.groupID}
              museClientConfig={this.props.museClientConfig}
            />

            <div className="group_next" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <p className="group_volume">Group Volume:</p>
          <VolumeComponentWrapper
            groupID={this.props.groupID}
            museClientConfig={this.props.museClientConfig}
          />
        </div>

        <div className="players_component">
          <div className="player_name">
            <div className="player_box">
              <div className="player_text">Players</div>
            </div>
          </div>
          {!this.props.groupsInfoState.group_flag && (
            <PlayersController
              group={this.props.groupsInfoState.groups[this.props.groupID]}
              players={this.props.groupsInfoState.players}
              museClientConfig={this.props.museClientConfig}
            />)}
        </div>
      </div>
    );
  }

  skipToPrevious = () => {
    this.props.setSkipBack(true);
  };

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
    this.ControlOptions.helperControls("playback/skipToNextTrack", this.props.groupID, {});
  };
}

export default GroupPlayersComponent;
