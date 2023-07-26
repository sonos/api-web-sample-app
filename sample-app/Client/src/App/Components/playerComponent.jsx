import React from "react";
import { Component } from "react";
import SetVolume from "../ControlAPIs/setVolume";
import GetPlayerVolume from "../ControlAPIs/getPlayerVolume";
import HelperControls from "../ControlAPIs/playerControls";
import PlayerVolumeSubscribe from "../UserDetails/playerVolumeSubscribe";
import {debounce} from "lodash"

/**
 * Class component for a single player
 * Has grouping/ungrouping functionality on click and shows volume slider when grouped
 */
class PlayerComponent extends Component {
  /**
   * @param props.state {JSON} accesses the state of this player's Atom in playerVolumeAtomFamily
   * @param props.setState modifies the state of this player's Atom in playerVolumeAtomFamily
   * @param props.inGroup {boolean} True if player is in the currently displayed group, false otherwise. Obtained from groupsInfoAtom
   * @param props.group {JSON} Contains current group's information
   * @param props.playerId {string} This player's playerId
   * @param props.museClientConfig {JSON} Contains Sonos API access token and configuration
   */
  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef();

    // Allows this.handleGroupChange to be an onClick listener
    this.handleGroupChange = this.handleGroupChange.bind(this);

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();

    // Sets initial state of player
    // getStartVolumeFlag = true ensures that current volume value is fetched on instantiation
    this.props.setState({
      getStartVolumeFlag: true,
      volumeVal: this.props.state.volumeVal,
    });
  }

  /**
   * When this player is clicked, if this player is not in the current group, it is added to the current group
   * If this player is in the current group, it is removed from the current group
   */
  handleGroupChange() {
    // Both arrays are required for the API call even if one array is empty
    const data = {
      // All players in playerIdsToAdd are added to the specified group
      playerIdsToAdd:[],

      // All players in playerIdsToRemove are removed from the specified group
      playerIdsToRemove:[]
    }

    // If player is not in current group, player is added to current group. Otherwise, player is removed from current group
    if(!this.props.inGroup) {
      data.playerIdsToAdd = [this.props.playerId];
    } else {
      data.playerIdsToRemove = [this.props.playerId];
    }

    // Executes Sonos API call
    this.ControlOptions.helperControls("groups/modifyGroupMembers", this.props.group.id, data);
  }

  /**
   * Calls Sonos API to set player volume after volume slider value hasn't changed for 300ms
   * Stops user from spamming Sonos API, which also reduces number of volume events received and helps prevent volume slider
   * from attempting to update while user is still changing it
   * @type {DebouncedFunc<function(*): void>}
   */
  debouncedSetVolume = debounce(volume => SetVolume(volume, this.props.playerId, "PLAYER", this.props.museClientConfig), 300);

  /**
   * onChange handler for volume slider. Updates playerVolumeAtomFamily Atom's (and volume slider's) state and calls Sonos API to set player volume
   */
  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    this.props.setState({
      getStartVolumeFlag: this.props.state.getStartVolumeFlag,
      volumeVal: volume,
    });
    this.debouncedSetVolume(volume);
  }

  render() {
    return (
      <div>
        <div>
          {/* On instantiation, gets current player volume from Sonos API. GetPlayerVolume finishes by setting getStartVolumeFlag to false */}
          {this.props.state.getStartVolumeFlag && (
            <GetPlayerVolume
              playerId={this.props.playerId}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div className="playerVolumeSubscribe">
          {/* When player is in current group, player's volume is subscribed to */}
          {this.props.inGroup && (
            <PlayerVolumeSubscribe
              museClientConfig={this.props.museClientConfig}
              playerId={this.props.playerId}
            />
          )}
        </div>

        {/* Checkbox displays if player is in current group, and clicking the checkbox or text calls handleGroupChange */}
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.props.inGroup}
              onChange={this.handleGroupChange}
            />
            <span>{this.props.playerName}</span>
          </label>
        </div>

        {/* Player volume slider shows if player is in current group. Slider value updates corresponding to playerVolumeAtomFamily Atom's state */}
        {this.props.inGroup && (
          <div className="player_slider_container">
            <i className="fa fa-volume-down"></i>
            <input
              type="range"
              min="0"
              max="100"
              value={this.props.state.volumeVal}
              step="1"
              ref={this.volumeSlider}
              className="volumeSlider"
              onChange={this.onSetVolume}
            />
            <i className="fa fa-volume-up"></i>
          </div>
        )}
        <br />
      </div>
    );
  }
}

export default PlayerComponent;
