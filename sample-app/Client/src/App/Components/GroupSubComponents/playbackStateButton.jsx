import React from "react";
import { Component } from "react";
import GetPlaybackState from "../../ControlAPIs/getPlaybackState";
import HelperControls from "../../ControlAPIs/playerControls";

/**
 * Class component for play/pause button
 */
class PlayBackStateButton extends Component {
  /**
   * @param props.state {JSON} Accesses state of playbackStateAtom
   * @param props.setState Modifies state of playbackStateAtom
   * @param props.groupId {string} Used to target current group in Sonos API calls
   * @param props.museClientConfig {JSON} Contains access token for Sonos API calls
   */
  constructor(props) {
    super(props);

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();

    this.playpauseBtn = React.createRef();

    // getStateFlag = true ensures that current playback state is fetched on instantiation
    this.props.setState({
      isPlaying: false,
      getStateFlag: true,
      canSkip: false,
      canSkipBack: false,
      canSeek: false
    });
  }

  /**
   * Causes play symbol to show if paused and pause symbol to show if playing
   * @return {string} className of play or pause symbol
   */
  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return this.props.state.isPlaying ? pauseClass : playClass;
  };

  /**
   * onClick handler for play/pause button
   * Calls Sonos API to toggle playback for current group
   */
  toggleMusic = () => {
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
      // On instantiation, fetches current playback state from Sonos API. Displays play/pause button
      <div>
        <div>
          {this.props.state.getStateFlag && (
            <GetPlaybackState groupId={this.props.groupId} museClientConfig={this.props.museClientConfig}/>
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
