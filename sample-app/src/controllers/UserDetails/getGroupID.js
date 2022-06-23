import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import { useEffect, useState } from "react";
import axios from "axios";

function apiCall() {
  const HOUSEHOLD_ID = localStorage.getItem("household_id");
  let end_point_ = config.api_end_points.household_api_url + "/" + HOUSEHOLD_ID + "/groups";
  console.log("Endpoint is: " + end_point_)
  const authentication = new Authentication();
  const headers_ = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point_,
    method: "get",
    headers: headers_,
  });
}

export default function GetGroupID(props) {
  const [groupID, setGroupID] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    let mounted = true;
    apiCall()
      .then((res) => {
        if (mounted) {
          console.log("Logging : ", res.data);
          let group_id = res.data["groups"][0]["id"];
          setGroupID(group_id);
          setPlayers(res.data["players"]);
          setError(false);
          props.grp_handler(true);
        }
      })
      .catch(function (error) {
        props.grp_handler(false);
        console.log("Group ID could not be found");
        setError(true);
        return Promise.reject(error);
      });
    return () => (mounted = false);
  }, []);

  window.localStorage.setItem('group_id', groupID);
  window.localStorage.setItem('players', JSON.stringify(players));
  console.log("Group ID loaded from session storage: ", window.localStorage.group_id);
  console.log("Players loaded from session storage: ", JSON.parse(window.localStorage.players));

  return error === true ? (
    <h1 align="center">Group ID could not be found</h1>
  ) : (
    <h1></h1>
  );
}
