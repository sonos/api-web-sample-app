import React from "react";
import { Component } from "react";
import PlayBackMetadata from "../../ControlAPIs/playbackMetadata";
import ImageComponent from "./imageComponent";
import ServiceLogoComponent from "./serviceLogoComponent";

/**
 * Class component for displaying track metadata (track name, track image, artist, container)
 */
class PlaybackMetaDataComponent extends Component {
  /**
  * @param props.state {JSON} Accesses playbackMetadataAtom's state
  * @param props.setState Modifies playbackMetadataAtom's state
  * @param props.groupId {string} Used to target specific group when fetching current playback metadata from Sonos API
  * @param props.museClientConfig {JSON} Contains access token for Sonos API call
  */
  constructor(props) {
    super(props);
    this.volumeSlider = React.createRef();

    // Resets playbackMetadataAtom to initial state
    // getPlaybackMetaDataFlag = true ensures that new metadata is fetched on instantiation
    this.props.setState({
      getPlayBackMetaDataFlag: true,
      trackName: null,
      trackImage: null,
      artistName: null,
      containerName: null,
      serviceId: null,
      serviceName: null
    });
  }

  /**
   * If track image does not exist, a generic placeholder image is used. Otherwise, the currently stored track image is returned
   * @returns {string} Track image src
   */
  getImage = () => {
    if (!this.props.state.trackImage) {
      return require("../../../images/sonos.png");
    } else {
      return this.props.state.trackImage;
    }
  };

  render() {
    return (
      <div className="play_back_metadata">
        {/*
          Fetches current playback metadata on playbackMetaDataComponent instantiation (only when getPlaybackMetaDataFlag is true)
          PlaybackMetadata sets getPlaybackMetaDataFlag to false upon completion
         */}
        {this.props.state.getPlayBackMetaDataFlag && (
          <PlayBackMetadata
            groupId={this.props.groupId}
            museClientConfig={this.props.museClientConfig}
          />
        )}

        {/* Displays current track information based on the state of playbackMetadataAtom */}
        <div className="track_details">
          <div className="track_image">
            <ImageComponent src={this.getImage()} alt="Song being played" />
          </div>
          <div className="track_name">{this.props.state.trackName}</div>
          <div className="track_artist">{this.props.state.artistName}</div>
          <div className="track_container">{this.props.state.containerName}</div>
          <ServiceLogoComponent serviceId={this.props.state.serviceId} serviceName={this.props.state.serviceName} />
        </div>
      </div>
    );
  }
}

export default PlaybackMetaDataComponent;
