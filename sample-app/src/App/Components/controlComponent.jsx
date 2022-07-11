import React from "react";
import { Component } from "react";

import HelperControls from "../Controls/playerControls";
import GetVolume from "../Controls/getVolume";
import SetVolume from "../Controls/setVolume";
import PlayersComponent from "../Controllers/playersController";
import GetPlayBackMetadata from "../Controls/getPlayBackMetadata";
import ImageComponent from "./ImageComponent";

class Control extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.state = {
      isPlaying: false,
      volume_val: 40,
      get_start_volume_flag: true,
      trackName: null,
      artistName: null,
      trackImage: null
    };
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


          <div>
            {this.state.get_start_volume_flag && (
              <GetPlayBackMetadata
                group_id={this.group.id}
                setPlayBackMetadataHandler={this.setPlayBackMetadataHandler}
              />
            )}
          </div>

          <div className="details">
            <div className="track-image">
                <ImageComponent url={this.getImage()} 
                width="300"
                height="250"
                alt="Song being played"/>
            </div>
            <div className="track-name" >
            {this.state.trackName}
              </div>
            <div className="track-artist">
            {this.state.artistName}</div>
          </div>

          <div className="buttons">
            <div className="prev-track" onClick={this.skipToPrevious}>
              <i className="fa fa-step-backward fa-2x"></i>
            </div>
            <div
              ref={this.playpause_btn}
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
              value={this.state.volume_val}
              step="1"
              ref={this.volume_slider}
              className="volume_slider"
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
      this.ControlOptions.helper_controls("play", this.group.id);
      this.setState({ isPlaying: true });
    } else {
      console.error("Already in Play Mode");
    }
  };

  toggleMusic = () => {
    console.debug("Trying to play/pause music...");
    this.setState({ isPlaying: !this.state.isPlaying });
    this.ControlOptions.helper_controls("togglePlayPause", this.group.id);
    this.playModeClass();
  };

  pauseMusic = () => {
    console.debug("Trying to pause music...");
    if (this.state.isPlaying) {
      this.ControlOptions.helper_controls("pause", this.group.id);
      this.setState({ isPlaying: false });
    } else {
      console.error("Already in Pause Mode");
    }
  };

  skipToPrevious = () => {
    console.debug("Trying to skip to previous song...");
    this.ControlOptions.helper_controls("skipToPreviousTrack", this.group.id);
    this.playMusic();
  };

  skipToNext = () => {
    console.debug("Trying to skip to next song...");
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

  setPlayBackMetadataHandler = (trackName, artistName, trackImage) => {
    this.setState({ trackName: trackName, artistName: artistName, trackImage : trackImage });
  };

  getImage= () => {
    if (this.state.trackImage === undefined || this.state.trackImage  === "") {
      return require("../../images/sonos.png");
  }else{
    return this.state.trackImage} 

  }
}

export default Control;
