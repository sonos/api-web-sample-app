import React from "react";
import { Component } from "react";
import PlayerComponent from "../Components/playerComponent";


class PlayersComponent extends Component {
    state = {  } 
    render() { 
        const group = JSON.parse(this.props.group);
        return (
            <div>
                <br/>
                <h1>Players: </h1>
                <div>
                    {group.playerIds.map(
                        playerId => (
                        <PlayerComponent
                            key = {playerId}
                            playerId = {playerId}
                        />
                        ))
                    }
                </div>
            </div>
        );
    }
}
 
export default PlayersComponent;