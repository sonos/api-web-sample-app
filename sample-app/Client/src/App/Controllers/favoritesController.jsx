import React from "react";
import { Component } from "react";
import GetFavorites from "../UserDetails/getFavorites";
import FavoriteComponent from "../Components/favoriteComponent";

/**
 * Class component that fetches and displays list of all Sonos favorites in selected household
 */
class FavoritesController extends Component {
  /**
   * @param props.museClientConfig {JSON} Contains Sonos API access token and configuration
   * @param props.householdId {string} Used to target current household when fetching favorites
   * @param props.groupId {string} Used to target current group when loading favorites
   */
  constructor(props) {
    super(props);

    // fetchFlag = true causes favorites to be fetched on instantiation
    this.state = {fetchFlag: true, favorites: []};
  }

  /**
   * Handler function that updates the array of favorites in this.state
   * @param favorites {Array} Array of JSON objects each containing the information of a favorite in current household
   */
  favoritesHandler = (favorites) => {
    // Fetch flag = false stops fetching of favorites from Sonos API
    this.setState({fetchFlag: false, favorites:favorites});
  }

  render() {
    return (
      <div className="favorites_list">
        {/* Upon instantiation, fetches favorites from Sonos API and sets fetchFlag to false */}
        {this.state.fetchFlag && (
          <GetFavorites
            museClientConfig={this.props.museClientConfig}
            householdId={this.props.householdId}
            favoritesHandler={this.favoritesHandler}
          />)}

        {/* Once favorites have been fetched, a button is created for each favorite */}
        {!this.state.fetchFlag && (
          this.state.favorites.map((item) => {
            return (<FavoriteComponent
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

export default FavoritesController;
