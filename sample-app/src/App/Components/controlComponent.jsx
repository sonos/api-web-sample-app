import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";
import GetVolume from "../Controls/getVolume";
import SetVolume from "../Controls/setVolume";
import PlayersComponent from "../Controllers/playersController";

class Control extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.state = {
      isPlaying: false,
      volume_val: 40,
      get_start_volume_flag: true,
    };
    // Creating references
    this.volume_slider = React.createRef();
    this.playpause_btn = React.createRef();
  }

  render() {
    this.group = JSON.parse(this.props.group);

    return (
      <div>
        <div className="player">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          />

          <div>
            <h1 className="oauthtext">Group Name: {this.group.name}</h1>
          </div>

          <div>
            {this.state.get_start_volume_flag && (
              <GetVolume
                device_id={this.group.id}
                device_type={"GROUP"}
                getVolumeHandler={this.getVolumeHandler}
              />
            )}
          </div>

          {/* <div align="center">
              <button className="fa fa-play-circle fa-5x m-3" onClick={() => this.playMusic()} >
                Play
              </button>
              <button className="fa fa-pause-circle fa-5x" onClick={() => this.pauseMusic()} >
                Pause
              </button>
          </div> */}

          <div className="details">
            <div className="track-art">
              <img
                src="https://images.unsplash.com/photo-1520444451380-ebe0f7b9cfd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXVkaW8lMjB2aXN1YWx8ZW58MHx8MHx8&w=1000&q=80"
                width="300"
                height="250"
                alt="Song being played"
              />
            </div>
            <div className="track-name">Track-Name</div>
            <div className="track-artist">Track Artist</div>
          </div>

          <div className="buttons">
            <div className="prev-track" onClick={() => this.skipToPrevious()}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>
            <div
              ref={this.playpause_btn}
              className="playpause-track"
              onClick={() => this.toggleMusic()}
            >
              <i className={this.playModeClass()}></i>
            </div>
            <div className="next-track" onClick={() => this.skipToNext()}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

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

          <PlayersComponent group={this.props.group} />
        </div>
      </div>
    );
  }

  playMusic = () => {
    if (!this.state.isPlaying) {
      this.ControlOptions.helper_controls("play", this.group.id);
      this.setState({ isPlaying: true });
    } else {
      console.error("Already in Play Mode");
    }
  };

  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return this.state.isPlaying ? pauseClass : playClass;
  };

  toggleMusic = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
    this.ControlOptions.helper_controls("togglePlayPause", this.group.id);
    this.playModeClass();
  };

  pauseMusic = () => {
    if (this.state.isPlaying) {
      this.ControlOptions.helper_controls("pause", this.group.id);
      this.setState({ isPlaying: false });
    } else {
      console.error("Already in Pause Mode");
    }
  };

  skipToPrevious = () => {
    this.ControlOptions.helper_controls("skipToPreviousTrack", this.group.id);
    this.playMusic();
  };

  skipToNext = () => {
    this.ControlOptions.helper_controls("skipToNextTrack", this.group.id);
    this.playMusic();
  };

  onSetVolume = () => {
    const volume = this.volume_slider.current.value;
    SetVolume(volume, this.group.id, "GROUP");
    this.setState({ volume_val: volume });
  };

  getVolumeHandler = (flag, volume_at_start) => {
    this.setState({ get_start_volume_flag: flag, volume_val: volume_at_start });
  };
}

export default Control;
