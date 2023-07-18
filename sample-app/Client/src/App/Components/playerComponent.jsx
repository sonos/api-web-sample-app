import React from "react";
import { Component } from "react";

import SetVolume from "../ControlAPIs/setVolume";
import GetPlayerVolume from "../ControlAPIs/getPlayerVolume";
import PlayerSubscribe from "../UserDetails/playerSubscribe";
import HelperControls from "../ControlAPIs/playerControls";
import {debounce} from "lodash";

class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef();
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.ControlOptions = new HelperControls();
    this.props.setState({
      getStartVolumeFlag: true,
      volumeVal: this.props.state.volumeVal,
    });
  }

  handleGroupChange() {
    const data = {
      playerIdsToAdd:[],
      playerIdsToRemove:[]
    }
    if(!this.props.inGroup) {
      data.playerIdsToAdd = [this.props.playerId];
    }
    else {
      data.playerIdsToRemove = [this.props.playerId];
    }
    this.ControlOptions.helperControls("groups/modifyGroupMembers", this.props.group.id, data);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.state.getStartVolumeFlag && (
            <GetPlayerVolume
              state={this.props.state}
              deviceId={this.props.playerId}
              museClientConfig={this.props.museClientConfig}
            />
          )}
        </div>
        <div className="subscribe">
          {this.props.inGroup && (
            <PlayerSubscribe
              museClientConfig={this.props.museClientConfig}
              playerID={this.props.playerId}
            />
          )}
        </div>
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

  debouncedSetVolume = debounce(volume => SetVolume(volume, this.props.playerId, "PLAYER", this.props.museClientConfig), 300);

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    this.props.setState({
      getStartVolumeFlag: this.props.state.getStartVolumeFlag,
      volumeVal: volume,
    });
    this.debouncedSetVolume(volume);
  }
}

export default PlayerComponent;
