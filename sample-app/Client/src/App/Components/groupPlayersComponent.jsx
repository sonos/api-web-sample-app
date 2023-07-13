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
import GetGroupedPlayer from "../ControlAPIs/getGroupedPlayer";

class GroupPlayersComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
    this.group = JSON.parse(this.props.group);
    this.props.setState({groupName: this.group.name})
  }

  render() {

    return (
      <div className="selected_group_page">
        <div className="subscribe">
          <Subscribe
            museClientConfig={this.props.museClientConfig}
            groupID={this.group.id}
          />
        </div>

        {this.props.state.groupGoneFlag && (
          <GroupGoneRoutingController
            navigate={this.props.navigate}
          />
        )}

        <div className="grouped_players_setter">
          {this.group.playerIds.map((item) => {
            return (<GetGroupedPlayer
              key={item}
              playerID={item}
            />)
          })}
        </div>

        <HeaderComponent />

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
