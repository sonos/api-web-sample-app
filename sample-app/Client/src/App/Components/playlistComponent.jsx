import React from "react";
import { Component } from "react";
import HelperControls from "../ControlAPIs/playerControls";
import {Container} from "reactstrap";

/**
 * Class component for a single Sonos playlist
 * Displays button and loads playlist on click
 */
class PlaylistComponent extends Component {
  /**
   * @param props.state {JSON} Playlist information, including name and ID
   * @param props.groupId {string} Used to target current group when calling Sonos API
   */
  constructor(props) {
    super(props);

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();
  }

  /**
   * onClick handler that calls Sonos API to load playlist for currently displayed group
   */
  loadPlaylistHandler = () => {
    const data = { playlistId: this.props.state.id }
    this.ControlOptions.helperControls("playlists", this.props.groupId, data);
  }

  render() {
    // Returns button that displays playlist name and when clicked, loads playlist to current group
    return (
      <div>
        <Container>
          <a onClick={this.loadPlaylistHandler}>
            <p className="playback_item">{this.props.state.name}</p>
          </a>
        </Container>
      </div>
    );
  }
}

export default PlaylistComponent;
