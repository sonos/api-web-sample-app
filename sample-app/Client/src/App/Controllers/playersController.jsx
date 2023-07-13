import React from "react";
import { Component } from "react";
import PlayerComponentWrapper from "../Components/playerComponentWrapper";

class PlayersController extends Component {
  state = {};
  render() {
    const players = JSON.parse(this.props.players);

    return (
      <div>
        <br />
        {players.map((item) => {
          return (<PlayerComponentWrapper
            key={item.id}
            playerId={item.id}
            playerName={item.name}
            museClientConfig={this.props.museClientConfig}
          />)
        })}
      </div>
    );
  }
}

export default PlayersController;
