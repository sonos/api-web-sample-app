import React from "react";
import { Component } from "react";
import HelperControls from "../../ControlAPIs/playerControls";
import PlayBackMetadata from "../../ControlAPIs/playbackMetadata";
import ImageComponent from "./imageComponent";
import { SocketContext, socket } from "../../WebSocket/socket";
import PlayBackMetaDataEvent from "../../WebSocket/playbackMetaDataEvent";

class PlayBackMetaDataComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      getPlayBackMetaDataFlag: true,
      trackName: null,
      albumName: null,
      trackImage: null,
      artistName: null
    };
  }

  playBackMetadataHandler = (flag, trackName, albumName, trackImage, artistName) => {
    this.setState({
      getPlayBackMetaDataFlag: flag,
      trackName: trackName,
      albumName: albumName,
      trackImage: trackImage,
      artistName: artistName
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
        albumName: response["albumName"],
        trackImage: response["trackImage"],
        artistName: response["artistName"]
      });
    }
  };

  render() {
    return (
      <div className="play_back_metadata">
        <SocketContext.Provider value={socket}>
          <PlayBackMetaDataEvent handler={this.receiveEventsHandler} />
        </SocketContext.Provider>

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
            <div className="track_artist">{this.state.artistName} • {this.state.albumName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayBackMetaDataComponent;
