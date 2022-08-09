import React from "react";
import { Component } from "react";

import GetVolume from "../ControlAPIs/getVolume";
import SetVolume from "../ControlAPIs/setVolume";

class PlayerComponent extends Component {
  constructor() {
    super();
    this.state = { volumeVal: 40, getStartVolumeFlag: true };
    this.volumeSlider = React.createRef();
  }

  render() {
    return (
      <div>
        <div>
          {this.state.getStartVolumeFlag && (
            <GetVolume
              deviceId={this.props.playerId}
              deviceType={"PLAYER"}
              getVolumeHandler={this.getVolumeHandler}
              museClientConfig = {this.props.museClientConfig}
            />
          )}
        </div>
        <div className="playerName">
          {this.props.playerName}
        </div>
        <div className="player_slider_container">
          <i className="fa fa-volume-down"></i>
          <input
            type="range"
            min="1"
            max="100"
            value={this.state.volumeVal}
            step="1"
            ref={this.volumeSlider}
            className="volumeSlider"
            onChange={() => this.onSetVolume()}
          />
          <i className="fa fa-volume-up"></i>
        </div>
        <br />
      </div>
    );
  }

  getVolumeHandler = (flag, volumeAtStart) => {
    this.setState({ getStartVolumeFlag: flag, volumeVal: volumeAtStart });
  };

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    SetVolume(volume, this.props.playerId, "PLAYER", this.props.museClientConfig);
    this.setState({ volumeVal: volume });
  };
}

export default PlayerComponent;
