import React from "react";
import { Component } from "react";
import GetVolume from "../Players/getVolume";
import HelperControls from "../Players/helperControls";
import SetVolume from "../Players/setVolume";

class Player extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.SetVolume = new SetVolume();
    this.state = {isPlaying:false, volume_val: 40, get_start_volume_flag: true};
    // Creating references
    this.volume_slider = React.createRef();
    this.playpause_btn = React.createRef();
  }

  render() {
    return (
    <div className="player">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />

      <div>
        {this.state.get_start_volume_flag && <GetVolume getVolumeHandler = {this.getVolumeHandler}/>}
      </div>

      <div align="center">
          <button className="fa fa-play-circle fa-5x m-3" onClick={() => this.playMusic()} >
            Play
          </button>
          <button className="fa fa-pause-circle fa-5x" onClick={() => this.pauseMusic()} >
            Pause
          </button>
      </div>

      <div className="buttons">
          <div className="prev-track" onClick={() => this.skipToPrevious()} >
              <i className="fa fa-step-backward fa-2x"></i>
          </div>
          <div ref={this.playpause_btn} className="playpause-track" onClick={() => this.toggleMusic()} >
              <i className={this.playModeClass()}></i>
          </div>
          <div className="next-track" onClick={() => this.skipToNext()} >
              <i className="fa fa-step-forward fa-2x"></i>
          </div>
      </div>
      
      <div className="slider_container">
        <i className="fa fa-volume-down"></i>
        <input type="range" min="1" max="100"
          value={this.state.volume_val} step="1" ref={this.volume_slider} className="volume_slider" onChange={() => this.onSetVolume()} />
        <i className="fa fa-volume-up"></i>
    </div>

    </div>
    );
  }

  playMusic = () => {
    console.log("Trying to play music...");
    if (!this.state.isPlaying){
      this.ControlOptions.helper_controls("play");
      this.setState({isPlaying:true});
    }
    else{
      console.error("Already in Play Mode")
    }
  };


  playModeClass = () => {
    const playClass = "fa fa-play-circle fa-5x"
    const pauseClass = "fa fa-pause-circle fa-5x"
    return ((this.state.isPlaying)  ? pauseClass : playClass)
  }

  toggleMusic = () => {
    console.log("Trying to play/pause music...");
    this.setState({isPlaying:!this.state.isPlaying});
    this.ControlOptions.helper_controls("togglePlayPause");
    this.playModeClass();
  }

  pauseMusic = () => {
    console.log("Trying to pause music...");
    if (this.state.isPlaying){
      this.ControlOptions.helper_controls("pause");
      this.setState({isPlaying:false});
    }
    else{
      console.error("Already in Pause Mode")
    }
  };

  skipToPrevious = () => {
    console.log("Trying to Skip to previous song...");
    this.ControlOptions.helper_controls("skipToPreviousTrack");
    this.playMusic();
  };

  skipToNext = () => {
    console.log("Trying to Skip to next song...");
    this.ControlOptions.helper_controls("skipToNextTrack");
    this.playMusic();
  };

  onSetVolume = () => {
    console.log("Volume Slider is : ", this.volume_slider);
    const volume = this.volume_slider.current.value;
    console.log(volume);
    this.SetVolume.setVolume(volume);
    this.setState({volume_val: volume});
  }

  getVolumeHandler = (flag, volume_at_start) =>{
    this.setState({get_start_volume_flag : flag, 
                  volume_val : volume_at_start});
  }

}

export default Player;
