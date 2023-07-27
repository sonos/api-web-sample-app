import React from "react";
import { Component } from "react";

import HelperControls from "../ControlAPIs/playerControls";
import Subscribe from "../UserDetails/subscribe";
import PlaybackMetaDataComponentWrapper from "./GroupSubComponents/playbackMetaDataComponentWrapper";
import PlayBackStateButtonWrapper from "./GroupSubComponents/playbackStateButtonWrapper";
import VolumeComponentWrapper from "./GroupSubComponents/volumeComponentWrapper";
import PlayersController from "../Controllers/playersController";
import HeaderComponent from "./headerComponent";
import GroupGoneRoutingController from "../Controllers/groupGoneRoutingController";
import BackButton from "./backButtonComponent"
import GetGroups from "../UserDetails/getGroups";
import GroupsSubscribe from "../UserDetails/groupsSubscribe";
import FavoritesController from "../Controllers/favoritesController";
import Select from "react-select";
import PlaylistsController from "../Controllers/playlistsController";

class GroupPlayersComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
    this.lastClickTime = Date.now();

    // Keeps track of which menu option to display (players, favorites, or playlists). Displays players by default
    this.state = {menuState:"PLAYERS"};

    // Dropdown menu options
    this.options = [
      { value: "PLAYERS", label: "Players"},
      { value: "FAVORITES", label: "Favorites"},
      { value: "PLAYLISTS", label: "Playlists"}
    ];
  }
  render() {
    return (
      <div className="selected_group_page">
        <Subscribe
          museClientConfig={this.props.museClientConfig}
          groupId={this.props.groupId}
        />

        <div>
          <GroupsSubscribe householdId= {this.props.householdId}/>
        </div>

        {this.props.groupsInfoState.groupFlag && (
          <GetGroups
            householdId={this.props.householdId}
            museClientConfig={this.props.museClientConfig}
            setGroup={true}
            groupId={this.props.groupId}
            showLoadingScreen={false}
          />
        )}

        {this.props.state.groupGoneFlag && (
          <GroupGoneRoutingController
            navigate={this.props.navigate}
          />
        )}

        <HeaderComponent />

        <div className="group_name">
          <div className="back_button_Wrapper">
            <BackButton navigate={this.props.navigate}/>
          </div>
          <div className="group_box">
            <p>{this.props.state.groupName} </p>
          </div>
        </div>

        <div className="player">
          <PlaybackMetaDataComponentWrapper
            groupId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />
          <div className="group_buttons">
            <div className={this.props.playback.canSkipBack === false && this.props.playback.canSeek === false ? "group_prev_disabled" : "group_prev"} onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            <PlayBackStateButtonWrapper
              groupId={this.props.groupId}
              museClientConfig={this.props.museClientConfig}
            />

            <div className={this.props.playback.canSkip === false ? "group_next_disabled" : "group_next"} onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <p className="group_volume">Group Volume:</p>
          <VolumeComponentWrapper
            groupId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />
        </div>

        <div className="dropdown_menu">
          {/* Dropdown menu that allows user to choose whether to see a list of players, favorites, or playlists */}
          <Select
            options={this.options}
            onChange={this.handleDisplayChange}
            defaultValue={{label: "Players", value: "PLAYERS"}}
            className="react_select_container"
            classNamePrefix="react_select"
            isSearchable={false}
          />
        </div>

        {/* Displays favorites, playlists, or players depending on dropdown menu selection */}
        {this.state.menuState === "FAVORITES" && (
          <FavoritesController
            museClientConfig={this.props.museClientConfig}
            householdId={this.props.householdId}
            groupId={this.props.groupId}
          />)}
        {this.state.menuState === "PLAYLISTS" && (
          <PlaylistsController
            museClientConfig={this.props.museClientConfig}
            householdId={this.props.householdId}
            groupId={this.props.groupId}
          />)}
        {this.state.menuState === "PLAYERS" && !this.props.groupsInfoState.groupFlag && (
          <PlayersController
            group={this.props.groupsInfoState.groups[this.props.groupId]}
            players={this.props.groupsInfoState.players}
            museClientConfig={this.props.museClientConfig}
          />)}
      </div>
    );
  }

  skipToPrevious = () => {
    let elapsedTime = Date.now() - this.lastClickTime;
    console.debug("Trying to skip to previous song...");
    if(this.props.playback.canSkipBack && (!this.props.playback.canSeek || elapsedTime <= 4000)) {
      this.ControlOptions.helperControls("playback/skipToPreviousTrack", this.props.groupId, {});
    } else if(this.props.playback.canSeek) {
      this.ControlOptions.helperControls("playback/seek", this.props.groupId, {positionMillis: 0});
    }
    this.lastClickTime = Date.now();
  }

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
    if(this.props.playback.canSkip) {
      this.ControlOptions.helperControls("playback/skipToNextTrack", this.props.groupId, {});
    }
  }

  /**
   * onChange handler for dropdown menu. Updates this.state.menuState, which determines which component to display at bottom of screen
   * @param event {JSON} Information of dropdown menu selection
   */
  handleDisplayChange = (event) => {
    this.setState({menuState:event.value});
  }
}

export default GroupPlayersComponent;
