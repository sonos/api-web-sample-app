import React from "react";
import { Component } from "react";
import HelperControls from "../../ControlAPIs/playerControls";
import PlayBackMetadata from "../../ControlAPIs/playbackMetadata";
import ImageComponent from "./imageComponent";

class PlayBackMetaDataComponent extends Component {
  constructor(props) {
    super(props);
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.props.setState({
      getPlayBackMetaDataFlag: true,
      trackName: null,
      trackImage: null,
      artistName: null,
      containerName: null
    });
  }

  getImage = () => {
    if (this.props.state.trackImage === undefined || this.props.state.trackImage === "") {
      return require("../../../images/sonos.png");
    } else {
      return this.props.state.trackImage;
    }
  };

  render() {
    return (
      <div className="play_back_metadata">
        {this.props.state.getPlayBackMetaDataFlag && (
          <PlayBackMetadata
            groupId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />
        )}
        <div className="track_details">
          <div className="track_image">
            <ImageComponent src={this.getImage()} alt="Song being played" />
            <div className="track_name">{this.props.state.trackName}</div>
            <div className="track_artist">{this.props.state.artistName}</div>
            <div className="track_container">{this.props.state.containerName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayBackMetaDataComponent;
