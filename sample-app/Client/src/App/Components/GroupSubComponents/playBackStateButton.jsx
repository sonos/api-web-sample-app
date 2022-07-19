import React from "react";
import { Component } from "react";
import StateAtStart from "../../Controls/playBackState";
import HelperControls from "../../Controls/playerControls";
import SetUpClient from "../../WebSokcet/setUpWebsocketClient";

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
      this.ControlOptions.helperControls("play", this.props.groupID);
      this.props.playStateHandler(true);
    } else {
      console.error("Already in Play Mode");
    }
  };

  pauseMusic = () => {
    console.debug("Trying to pause music...");
    if (this.state.isPlaying) {
      this.ControlOptions.helperControls("pause", this.props.groupID);
      this.props.playStateHandler(false);
    } else {
      console.error("Already in Pause Mode");
    }
  };

  toggleMusic = () => {
    console.debug("Trying to play/pause music...");
    const result = this.ControlOptions.helperControls("togglePlayPause", this.props.groupID);
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
    response = JSON.parse(response);
    console.log(response);
    if (response.method === "playBackState"){
      this.setState({isPlaying : response["data"]["isPlayingFlag"]});
    }
  }

  render() {
    return (
      <div>
        {/* Setting up the Web Socket Client */}
        <SetUpClient receiveEventsHandler={this.receiveEventsHandler} />

        <div>
          {this.state.getStateFlag && (
            <StateAtStart
              deviceId={this.props.groupID}
              getStateHandler={this.getStateHandler}
            />
          )}
        </div>

        <div
          ref={this.playpauseBtn}
          className="playpause-track"
          onClick={this.toggleMusic}
        >
          <i className={this.playModeClass()}></i>
        </div>
      </div>
    );
  }
}

export default PlayBackStateButton;
