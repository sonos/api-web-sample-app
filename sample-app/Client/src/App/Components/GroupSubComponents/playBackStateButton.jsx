import React from "react";
import { Component } from "react";
import PlayBackToggleComponent from "../../Controls/PlayBackToggleComponent";
import HelperControls from "../../Controls/playerControls";
import PlayBackStateEvent from "../../WebSocket/playBackStateEvent";
import { SocketContext, socket } from "../../WebSocket/socket";

class PlayBackStateButton extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.playpauseBtn = React.createRef();
    this.state = {
      isPlaying: false,
      getStateFlag: true,
    };
  }

  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return this.state.isPlaying ? pauseClass : playClass;
  };

  playMusic = () => {
    console.debug("Trying to play music...");
    if (!this.state.isPlaying) {
      this.ControlOptions.helperControls("play", this.props.groupID, this.props.museClientConfig);

      this.props.playStateHandler(true);
    } else {
      console.error("Already in Play Mode");
    }
  };

  pauseMusic = () => {
    console.debug("Trying to pause music...");
    if (this.state.isPlaying) {
      this.ControlOptions.helperControls("pause", this.props.groupID, this.props.museClientConfig);

      this.props.playStateHandler(false);
    } else {
      console.error("Already in Pause Mode");
    }
  };

  toggleMusic = () => {
    console.debug("Trying to play/pause music...");
    const result = this.ControlOptions.helperControls(
      "togglePlayPause",
      this.props.groupID,
      this.props.museClientConfig
    );
    console.log(result);

    // if (result === true){
    //   this.setState({ isPlaying: !this.state.isPlaying });
    // };
    this.setState({ isPlaying: !this.state.isPlaying });
    this.playModeClass();
  };

  getStateHandler = (flag, stateAtStart) => {
    this.setState({ getStateFlag: flag, isPlaying: stateAtStart });
  };

  receiveEventsHandler = (response) => {
    console.log(response);
    const newState = response["isPlayingFlag"];
    if (this.state.isPlaying !== newState) {
      this.setState({ isPlaying: newState });
    }
  };

  render() {
    return (
      <div>
        <SocketContext.Provider value={socket}>
          <PlayBackStateEvent handler={this.receiveEventsHandler} />
        </SocketContext.Provider>

        <div>
          {this.state.getStateFlag && (
            <PlayBackToggleComponent
              deviceId={this.props.groupID}
              getStateHandler={this.getStateHandler}
              museClientConfig = {this.props.museClientConfig}
            />
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
