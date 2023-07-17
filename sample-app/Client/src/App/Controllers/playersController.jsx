import React from "react";
import { Component } from "react";
import PlayerComponentWrapper from "../Components/playerComponentWrapper";

class PlayersController extends Component {
  state = {};
  render() {
    const players = this.props.players;
    return (
      <div>
        <br />
        {players.map((item) => {
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
