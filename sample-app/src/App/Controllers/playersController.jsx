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
                        player_id => (
                        <PlayerComponent
                            key = {player_id}
                            player_id = {player_id}
                        />
                        ))
                    }
                </div>
            </div>
        );
    }
}
 
export default PlayersComponent;