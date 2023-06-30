import React from "react";
import { Component } from "react";
import HelperControls from "../../ControlAPIs/playerControls";
import PlayBackMetadata from "../../ControlAPIs/playbackMetadata";
import ImageComponent from "./imageComponent";
import PlayBackMetaDataEvent from "../../WebSocket/playbackMetaDataEvent";

class PlayBackMetaDataComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      getPlayBackMetaDataFlag: true,
      trackName: null,
      trackImage: null,
      artistName: null,
      containerName: null
    };
  }

  playBackMetadataHandler = (flag, trackName, artistName, containerName, trackImage) => {
    this.setState({
      getPlayBackMetaDataFlag: flag,
      trackName: trackName,
      trackImage: trackImage,
      artistName: artistName,
      containerName: containerName
    });
  };

  getImage = () => {
    if (this.state.trackImage === undefined || this.state.trackImage === "") {
      return require("../../../images/sonos.png");
    } else {
      return this.state.trackImage;
    }
  };

  receiveEventsHandler = (response) => {
    console.log(response);
    if (this.state.trackName !== response["trackName"]) {
      this.setState({
        trackName: response["trackName"],
        trackImage: response["trackImage"],
        artistName: response["artistName"],
        containerName: response["containerName"]
      });
    }
  };

  render() {
    return (
      <div className="play_back_metadata">
        <PlayBackMetaDataEvent handler={this.receiveEventsHandler} />

        {this.state.getPlayBackMetaDataFlag && (
          <PlayBackMetadata
            group_id={this.props.groupID}
            playBackMetadataHandler={this.playBackMetadataHandler}
            museClientConfig={this.props.museClientConfig}
          />
        )}
        <div className="track_details">
          <div className="track_image">
            <ImageComponent src={this.getImage()} alt="Song being played" />
            <div className="track_name">{this.state.trackName}</div>
            <div className="track_artist">{this.state.artistName}</div>
            <div className="track_container">{this.state.containerName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayBackMetaDataComponent;
