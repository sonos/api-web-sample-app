import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";
import GetVolume from "../Controls/getVolume";
import SetVolume from "../Controls/setVolume";
import PlayersComponent from "../Controllers/playersController";
import PlayBackMetadata from "../Controls/PlayBackMetadata";
import ImageComponent from "./ImageComponent";
import StateAtStart from "../Controls/getState";

class Control extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.state = {
      isPlaying: false,
      volumeVal: 40,
      getStartVolumeFlag: true,
      getStateFlag: true,
      getPlayBackMetaDataHandler: true,
      trackName: null,
      artistName: null,
      trackImage: null,
    };
    this.volumeSlider = React.createRef();
    this.playpauseBtn = React.createRef();
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
            {this.state.getStartVolumeFlag && (
              <GetVolume
                deviceId={this.group.id}
                deviceType={"GROUP"}
                getVolumeHandler={this.getVolumeHandler}
              />
            )}
          </div>

          <div>
            {this.state.getStateFlag && (
              <StateAtStart
                deviceId={this.group.id}
                getStateHandler={this.getStateHandler}
              />
            )}
          </div>

          <div>
            {this.state.getPlayBackMetaDataHandler && (
              <PlayBackMetadata
                group_id={this.group.id}
                playBackMetadataHandler={this.playBackMetadataHandler}
              />
            )}
          </div>

          <div className="details">
            <div className="track-image">
              <ImageComponent
                src={this.getImage()}
                width="300"
                height="250"
                alt="Song being played"
              />
            </div>
            <div className="track-name">{this.state.trackName}</div>
            <div className="track-artist">{this.state.artistName}</div>
          </div>

          <div className="buttons">
            <div className="prev-track" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>
            <div
              ref={this.playpauseBtn}
              className="playpause-track"
              onClick={this.toggleMusic}
            >
              <i className={this.playModeClass()}></i>
            </div>
            <div className="next-track" onClick={this.skipToNext}>
              <i className="fa fa-step-forward fa-2x"></i>
            </div>
          </div>

          <div className="slider_container">
            <i className="fa fa-volume-down"></i>
            <input
              type="range"
              min="1"
              max="100"
              value={this.state.volumeVal}
              step="1"
              ref={this.volumeSlider}
              className="volumeSlider"
              onChange={this.onSetVolume}
            />
            <i className="fa fa-volume-up"></i>
          </div>

          <PlayersComponent group={this.props.group} />
        </div>
      </div>
    );
  }

  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x";
    const pauseClass = "fa fa-pause-circle fa-5x";
    return this.state.isPlaying ? pauseClass : playClass;
  };

  playMusic = () => {
    console.debug("Trying to play music...");
    if (!this.state.isPlaying) {
      this.ControlOptions.helperControls("play", this.group.id);
      this.setState({ isPlaying: true });
    } else {
      console.error("Already in Play Mode");
    }
  };

  toggleMusic = () => {
    console.debug("Trying to play/pause music...");
    this.setState({ isPlaying: !this.state.isPlaying });
    this.ControlOptions.helperControls("togglePlayPause", this.group.id);
    this.playModeClass();
  };

  pauseMusic = () => {
    console.debug("Trying to pause music...");
    if (this.state.isPlaying) {
      this.ControlOptions.helperControls("pause", this.group.id);
      this.setState({ isPlaying: false });
    } else {
      console.error("Already in Pause Mode");
    }
  };

  skipToPrevious = () => {
    console.debug("Trying to skip to previous song...");
    this.ControlOptions.helperControls("skipToPreviousTrack", this.group.id);
    this.playMusic();
  };

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
    this.ControlOptions.helperControls("skipToNextTrack", this.group.id);
    this.playMusic();
  };

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    SetVolume(volume, this.group.id, "GROUP");
    this.setState({ volumeVal: volume });
  };

  getVolumeHandler = (flag, volumeAtStart) => {
    this.setState({ getStartVolumeFlag: flag, volumeVal: volumeAtStart });
  };

  getStateHandler = (flag, stateAtStart) => {
    this.setState({ getStateFlag: flag, isPlaying: stateAtStart });
  };

  playBackMetadataHandler = (flag, trackName, artistName, trackImage) => {
    this.setState({
      getPlayBackMetaDataHandler: flag,
      trackName: trackName,
      artistName: artistName,
      trackImage: trackImage,
    });
  };

  getImage = () => {
    if (this.state.trackImage === undefined || this.state.trackImage === "") {
      return require("../../images/sonos.png");
    } else {
      return this.state.trackImage;
    }
  };
}

export default Control;
