import React from "react";
import { Component } from "react";
import GetGroupVolume from "../../ControlAPIs/getGroupVolume";
import SetVolume from "../../ControlAPIs/setVolume";
import HelperControls from "../../ControlAPIs/playerControls";
import {debounce} from "lodash";

class VolumeComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.props.setState({
      volumeVal: 0,
      getStartVolumeFlag: true,
    });
  }

  debouncedSetVolume = debounce(volume => SetVolume(volume, this.props.groupId, "GROUP", this.props.museClientConfig), 300);

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    this.props.setState({
      volumeVal: volume,
      getStartVolumeFlag: false
    });
    this.debouncedSetVolume(volume);
  };

  render() {
    return (
      <div className="slider_container">
        {this.props.state.getStartVolumeFlag && (
          <GetGroupVolume
            deviceId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />
        )}

        <i className="fa fa-volume-down"></i>
        <input
          type="range"
          min="0"
          max="100"
          value={this.props.state.volumeVal}
          step="1"
          ref={this.volumeSlider}
          className="groupVolumeSlider"
          onChange={this.onSetVolume}
        />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }
}

export default VolumeComponent;
