import React from "react";
import { Component } from "react";
import HelperControls from "../../Controls/playerControls";
import PlayBackMetadata from "../../Controls/PlayBackMetadata";
import ImageComponent from "./ImageComponent";

class PlayBackMetaDataComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      getPlayBackMetaDataFlag: true,
      trackName: null,
      artistName: null,
      trackImage: null,
    };
  }

  playBackMetadataHandler = (flag, trackName, artistName, trackImage) => {
    this.setState({
      getPlayBackMetaDataFlag: flag,
      trackName: trackName,
      artistName: artistName,
      trackImage: trackImage,
    });
  };

  getImage = () => {
    if (this.state.trackImage === undefined || this.state.trackImage === "") {
      return require("../../../images/sonos.png");
    } else {
      return this.state.trackImage;
    }
  };

  render() {
    return (
      <div>
        {this.state.getPlayBackMetaDataFlag && (
          <PlayBackMetadata
            group_id={this.props.groupID}
            playBackMetadataHandler={this.playBackMetadataHandler}
          />
        )}

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
      </div>
    );
  }
}

export default PlayBackMetaDataComponent;
