import React from "react";
import { Component } from "react";
import HelperControls from "../ControlAPIs/playerControls";
import {Container} from "reactstrap";

/**
 * Class component for a single Sonos favorite
 * Displays button and loads favorite on click
 */
class FavoriteComponent extends Component {
  /**
   * @param props.state {JSON} Favorite information, including name and ID
   * @param props.groupId {string} Used to target current group when calling Sonos API
   */
  constructor(props) {
    super(props);

    // Used for Sonos API calls
    this.ControlOptions = new HelperControls();
  }

  /**
   * onClick handler that calls Sonos API to load favorite to currently displayed group
   */
  playFavoriteHandler = () => {
    const data = { favoriteId: this.props.state.id }
    this.ControlOptions.helperControls("favorites", this.props.groupId, data);
  }

  render() {
    // Returns button that displays favorite name and when clicked, loads favorite to current group
    return (
      <div>
        <Container>
          <a onClick={this.playFavoriteHandler}>
            <p className="playback_item">{this.props.state.name}</p>
          </a>
        </Container>
      </div>
    );
  }
}

export default FavoriteComponent;
