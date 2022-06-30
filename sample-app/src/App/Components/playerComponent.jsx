import React from "react";
import { Component } from "react";

import GetVolume from "../Controls/getVolume";
import SetVolume from "../Controls/setVolume";

class PlayerComponent extends Component {
  constructor() {
    super();
    this.state = { volume_val: 40, get_start_volume_flag: true };
    this.volume_slider = React.createRef();
  }

  render() {
    return (
      <div>
        <div>
          {this.state.get_start_volume_flag && (
            <GetVolume
              device_id={this.props.player_id}
              device_type={"PLAYER"}
              getVolumeHandler={this.getVolumeHandler}
            />
          )}
        </div>
        <h4>Player ID : {this.props.player_id}</h4>
        <div className="slider_container">
          <i className="fa fa-volume-down"></i>
          <input
            type="range"
            min="1"
            max="100"
            value={this.state.volume_val}
            step="1"
            ref={this.volume_slider}
            className="volume_slider"
            onChange={() => this.onSetVolume()}
          />
          <i className="fa fa-volume-up"></i>
        </div>
        <br />
      </div>
    );
  }

  getVolumeHandler = (flag, volume_at_start) => {
    this.setState({ get_start_volume_flag: flag, volume_val: volume_at_start });
  };

  onSetVolume = () => {
    const volume = this.volume_slider.current.value;
    SetVolume(volume, this.props.player_id, "PLAYER");
    this.setState({ volume_val: volume });
  };
}

export default PlayerComponent;
