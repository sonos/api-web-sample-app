import React from "react";
import { Component } from "react";
import PlayerComponent from "../Components/playerComponent";

class PlayersController extends Component {
  state = {};
  render() {
    // const group = JSON.parse(this.props.group);
    const players = JSON.parse(this.props.players);

    return (
      <div>
        <br />
        {players.map((item) => {
          return (<PlayerComponent
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
