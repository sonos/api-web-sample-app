import React from "react";
import { Component } from "react";
import PlayerComponentWrapper from "../Components/playerComponentWrapper";

/**
 * Class component that displays every player in the current household
 * See PlayerComponentWrapper and PlayerComponent for the function of each player
 */
class PlayersController extends Component {
  /**
   * @param props.players {Array} Array of JSON objects, each of which containing a player's information
   * @param props.museClientConfig {JSON} Contains access token needed for Sonos API calls
   * @param props.group {JSON} Contains information of current group, including ID and players in group
   */
  constructor(props) {
    super(props);
  }
  render() {
    // Through PlayerComponentWrapper, creates a PlayerComponent for every player in props.players
    const players = this.props.players;
    return (
      <div>
        <br />
        {players.map((item) => {
          {/* inGroup is true if current group contains this player */}
          return (<PlayerComponentWrapper
            key={item.id}
            group={this.props.group}
            playerId={item.id}
            playerName={item.name}
            museClientConfig={this.props.museClientConfig}
            inGroup={this.props.group.playersInGroup.hasOwnProperty(item.id)}
          />)
        })}
      </div>
    );
  }
}

export default PlayersController;
