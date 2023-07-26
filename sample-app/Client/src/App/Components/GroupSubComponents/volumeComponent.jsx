import React from "react";
import { Component } from "react";
import GetGroupVolume from "../../ControlAPIs/getGroupVolume";
import SetVolume from "../../ControlAPIs/setVolume";
import HelperControls from "../../ControlAPIs/playerControls";
import {debounce} from "lodash";

/**
 * Class component for group volume control
 */
class VolumeComponent extends Component {
  /**
   * @param props.state {JSON} Accesses volumeAtom's state
   * @param props.setState Modifies volumeAtom's state
   * @param props.groupID {string} Current group ID
   * @param props.museClientConfig {JSON} Contains Sonos API access key and configuration
   */
  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef();

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();

    // getStartVolumeFlag = true ensures that volume state is fetched from Sonos API upon instantiation
    this.props.setState({
      volumeVal: 0,
      getStartVolumeFlag: true,
    });
  }

  /**
   * Calls Sonos API to set group volume after volume slider value hasn't changed for 300ms
   * Stops user from spamming Sonos API, which also reduces number of volume events received and helps prevent volume slider
   * from attempting to update while user is still changing it
   * @type {DebouncedFunc<function(*): void>}
   */
  debouncedSetVolume = debounce(volume => SetVolume(volume, this.props.groupId, "GROUP", this.props.museClientConfig), 300);

  /**
   * onChange handler for volume slider. Updates volumeAtom's (and volume slider's) state and calls Sonos API to set group volume
   */
  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    this.props.setState({
      volumeVal: volume,
      getStartVolumeFlag: false
    });
    this.debouncedSetVolume(volume);
  };

  render() {
    // On instantiation, calls GetGroupVolume, which fetches volume state from Sonos API
    // Creates volume slider used to control and display group volume. Volume slider value is volumeAtom's volumeVal attribute
    return (
      <div className="slider_container">
        {this.props.state.getStartVolumeFlag && (
          <GetGroupVolume
            groupId={this.props.groupId}
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
