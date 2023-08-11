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

/**
 * This page contains all the components on the group playback page
 * Contains players in current household, group volume slider, players volume slider, and the back button to the groups page
 * @param props.householdId {string} targets specific household in Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @param props.groupId {string} targets specific group when fetching current playback state from Sonos API
 * @param props.playback {JSON} Accesses the state of playbackStateAtom
 * @param props.groupsInfoState {JSON} Accesses state of groupsInfoAtom
 */
class GroupPlaybackComponent extends Component {
  constructor(props) {
    super(props);

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();

    // Keeps track of when the "skip to previous" button was last clicked
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
        {/* Subscribes to the current group's playback state, volume, and playback metadata */}
        <Subscribe
          museClientConfig={this.props.museClientConfig}
          groupId={this.props.groupId}
        />

        <div>
          {/*
            Subscribes to groups events for the current household
+           Any groups change events received cause this component to be re-rendered with the new information 
          */}
          <GroupsSubscribe householdId= {this.props.householdId}/>
        </div>

        {/* Upon instantiation, fetches groups information from Sonos API and sets groupFlag to false */}
        {this.props.groupsInfoState.groupFlag && (
          <GetGroups
            householdId={this.props.householdId}
            museClientConfig={this.props.museClientConfig}
            setGroup={true}
            groupId={this.props.groupId}
            showLoadingScreen={false}
          />
        )}

        {/* When currently displayed group disappears, user is navigated back to groups page */}
        {this.props.state.groupGoneFlag && (
          <GroupGoneRoutingController
            navigate={this.props.navigate}
          />
        )}

        <HeaderComponent />
        <BackButton navigate={this.props.navigate}/>
        <div className="group_name">
          <div className="group_box">
            <p>{this.props.state.groupName} </p>
          </div>
        </div>

        <div className="player">
          {/* Fetches playback metadata from Sonos API and displays. Updates in response to events */}
          <PlaybackMetaDataComponentWrapper
            groupId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />

          <div className="group_buttons">
            {/* If repeat or repeatOne is available, repeat/repeatOne button is shown
                If repeat is enabled, repeat button is shown
                If repeatOne is enabled, repeatOne button is shown
                If both repeat and repeatOne are disabled, a light gray repeat button is shown */}
            <div className={(this.props.playback.repeatOne || this.props.playback.repeat) ? "repeat" : "not_repeat"} onClick={this.toggleRepeat}>
              {(this.props.playback.canRepeat || this.props.playback.canRepeatOne) && (!this.props.playback.repeatOne
                ? (<img className="pointer" src={require("../../images/repeat.png")} width="50px" height="50px" alt="Repeat"/>)
                : (<img className="pointer" src={require("../../images/repeat_one.png")} width="50px" height="50px" alt="Repeat One"/>)
              )}
            </div>

            {/* If current playback cannot skip to previous and cannot restart, skipToPrevious button appears disabled */}
            <div className={!this.props.playback.canSkipBack && !this.props.playback.canSeek ? "group_prev_disabled" : "group_prev"} onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>

            {/* Fetches playback state from Sonos API and displays play/pause button. Updates in response to events */}
            <PlayBackStateButtonWrapper
              groupId={this.props.groupId}
              museClientConfig={this.props.museClientConfig}
            />

            {/* If current playback cannot skip to next, skipToNext button appears disabled */}
            <div className={!this.props.playback.canSkip ? "group_next_disabled" : "group_next"} onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>

            {/* If shuffle is available, shuffle button is displayed. If shuffle is enabled, button has darker opacity */}
            <div className={this.props.playback.shuffle ? "shuffled" : "not_shuffled"} onClick={this.toggleShuffle}>
              {this.props.playback.canShuffle && (
                <img className="pointer" src={require("../../images/shuffle.png")} width="50px" height="50px" alt="Shuffle"/>
              )}
            </div>
          </div>

          <p className="group_volume">Group Volume:</p>
          {/* Fetches current group's volume state from Sonos API and displays volume slider. Volume slider value updates in response to events */}
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

  /**
   * onClick handler for skipToPrevious button
   * If skip back button was last clicked more than 4 seconds ago, restart current track if possible. Otherwise, skip to previous song if possible
   */
  skipToPrevious = () => {
    // Time in milliseconds between the lastClickTime and a current click
    let elapsedTime = Date.now() - this.lastClickTime;

    if(this.props.playback.canSkipBack && (!this.props.playback.canSeek || elapsedTime <= 4000)) {
      this.ControlOptions.helperControls("playback/skipToPreviousTrack", this.props.groupId, {});
    } else if(this.props.playback.canSeek) {
      this.ControlOptions.helperControls("playback/seek", this.props.groupId, {positionMillis: 0});
    }
    this.lastClickTime = Date.now();
  }

  /**
   * onClick handler for skipToNext button
   * Skips to next track if possible
   */
  skipToNext = () => {
    if(this.props.playback.canSkip) {
      this.ControlOptions.helperControls("playback/skipToNextTrack", this.props.groupId, {});
    }
  }

  /**
   * onClick handler for shuffle button
   * Toggles shuffle for current group if possible
   */
  toggleShuffle = () => {
    if(this.props.playback.canShuffle) {
      this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {shuffle: !this.props.playback.shuffle}});
    }
  }

  /**
   * onClick handler for repeat button
   * If repeat and repeatOne are available, cycles through repeat enabled, repeatOne enabled, and both disabled, in this order
   * If only repeat available, toggles repeat for the current group
   * If only repeatOne available, toggles repeatOne for the current group
   */
  toggleRepeat = () => {
    if(this.props.playback.canRepeat && this.props.playback.canRepeatOne) {
      if(this.props.playback.repeatOne) {
        this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {repeatOne: false, repeat: false}});
      } else if(this.props.playback.repeat) {
        this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {repeatOne: true, repeat: false}});
      } else {
        this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {repeatOne: false, repeat: true}});
      }
    } else if(this.props.playback.canRepeat) {
      this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {repeat: !this.props.playback.repeat}});
    } else if(this.props.playback.canRepeatOne) {
      this.ControlOptions.helperControls("playback/playMode", this.props.groupId, {playModes: {repeatOne: !this.props.playback.repeatOne}});
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

export default GroupPlaybackComponent;
