import React from "react";
import { Component } from "react";
import PlayBackToggleComponent from "../../ControlAPIs/playbackToggleComponent";
import HelperControls from "../../ControlAPIs/playerControls";

class PlayBackStateButton extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
    this.playpauseBtn = React.createRef();
    this.props.setState({
      isPlaying: false,
      getStateFlag: true
    });
  }

  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return this.props.state.isPlaying ? pauseClass : playClass;
  };

  toggleMusic = () => {
    console.debug("Trying to play/pause music...");
    this.ControlOptions.helperControls(
      "playback/togglePlayPause",
      this.props.groupId,
      {}
    );
    this.setState({
      isPlaying: !this.props.state.isPlaying,
      getStateFlag: this.props.state.getStateFlag
    });
    this.playModeClass();
  };

  render() {
    return (
      <div>
        <div>
          {this.props.state.getStateFlag && (
            <PlayBackToggleComponent deviceId={this.props.groupId} museClientConfig={this.props.museClientConfig}/>
          )}
        </div>

        <div ref={this.playpauseBtn} className="playpause_track" onClick={this.toggleMusic}>
          <i className={this.playModeClass()}></i>
        </div>
      </div>
    );
  }
}

export default PlayBackStateButton;
