import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { GroupsApiFactory } from "../museClient/api";
import { useState, useEffect } from "react";

/**
 * Returns a button that when clicked, routes user to the appropriate household's groups page
 * @param props.household {JSON} Contains household information
 * @param props.index {number} Used for naming the household, as most households do not have names
 * @returns {JSX.Element} Household button
 */
export default function HouseholdRoutingController(props) {
  // Used to change currently displayed path and send data to new path
  let navigate = useNavigate();
  
  //When set to false, list of players is rendered
  const [fetchFlag, setFetchFlag] = useState(true);
  
  // Stores list of players fetched from Sonos API
  const [players, setPlayers] = useState([]); 

  useEffect(() => {
    // Used to make groups Sonos API calls with currently stored access token and configuration
    const groupsApi = new GroupsApiFactory(props.museClientConfig);

    // Fetches current groups from Sonos API
    groupsApi.groupsGetGroups(props.household.id)
    .then((groupsApiResponse) => {
      setPlayers(groupsApiResponse.players);
      setFetchFlag(false);
    })
    .catch(function (error) {
      // Error in fetching data from Sonos API.
      console.error("Error", error);
    });
  }, []);

  /**
   * onClick listener of button that navigates to household's path and sends household ID information to new location
   */
  const routeChange = () => {
    let path = "households/" + props.household.id;
    const data = { state: { householdId: props.household.id } };
    navigate(path, data);
  };

  // Returns household button with routeChange as onClick listener
  return (
    <div className="household_det" onClick={routeChange}>
      <Container>
        <a>
          <p className="household_ind">Household {props.index + 1}</p>
          {/* Once players have been fetched, an array is created containing the players */}
          {!fetchFlag && (players.map((player, index) => {
            // If index of the player currently being processed is less than 4 or household has 5 players, display player
            if(players.length <= 5 || index < 4) {
              return (<p className="household_player_name" key={player.id}>{player.name}</p>);
            } else if(index === 4) {
              // For larger households, only the first four players are displayed and instead of displaying the 5th, the number of remaining players is displayed
              return (<p className="household_player_name" key={index}> + {players.length - 4} more</p>);
            }
            })
          )}
        </a>
      </Container>
    </div>
  );
}
