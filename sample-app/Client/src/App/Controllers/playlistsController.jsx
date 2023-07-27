import React from "react";
import { Component } from "react";
import GetPlaylists from "../UserDetails/getPlaylists";
import PlaylistComponent from "../Components/playlistComponent";

/**
 * Class component that fetches and displays list of all Sonos playlists in selected household
 */
class PlaylistsController extends Component {
  /**
   * @param props.museClientConfig {JSON} Contains Sonos API access token and configuration
   * @param props.householdId {string} Used to target current household when fetching playlists
   * @param props.groupId {string} Used to target current group when loading playlists
   */
  constructor(props) {
    super(props);

    // fetchFlag = true causes playlists to be fetched on instantiation
    this.state = {fetchFlag: true, playlists: []};
  }

  /**
   * Handler function that updates the array of playlists in this.state
   * @param playlists {Array} Array of JSON objects each containing the information of a playlist in current household
   */
  playlistsHandler = (playlists) => {
    // Fetch flag = false stops fetching of playlists from Sonos API
    this.setState({fetchFlag: false, playlists:playlists});
  }

  render() {
    return (
      <div className="favorites_list">
        {/* Upon instantiation, fetches playlists from Sonos API and sets fetchFlag to false */}
        {this.state.fetchFlag && (
          <GetPlaylists
            museClientConfig={this.props.museClientConfig}
            householdId={this.props.householdId}
            playlistsHandler={this.playlistsHandler}
          />)}

        {/* Once playlists have been fetched, a button is created for each playlist */}
        {!this.state.fetchFlag && (
          this.state.playlists.map((item) => {
            return (<PlaylistComponent
              key={item.id}
              state={item}
              groupId={this.props.groupId}
            />)
          })
        )}
      </div>
    );
  }
}

export default PlaylistsController;
