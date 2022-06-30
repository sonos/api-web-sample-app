import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import { useEffect, useState } from "react";
import axios from "axios";

import React from "react";

function apiCall() {
  const HOUSEHOLD_ID = localStorage.getItem("household_id");
  let end_point =
    config.api_end_points.household_api_url + "/" + HOUSEHOLD_ID + "/groups";
  const authentication = new Authentication();
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authentication.get_access_token(),
  };

  return axios({
    url: end_point,
    method: "get",
    headers: headers,
  });
}

export default function GetGroups(props) {
  const [error, setError] = useState([]);

  useEffect(() => {
    let mounted = true;
    apiCall()
      .then((res) => {
        if (mounted) {
          window.localStorage.setItem(
            "groups",
            JSON.stringify(res.data["groups"])
          );
          window.localStorage.setItem(
            "players",
            JSON.stringify(res.data["players"])
          );
          setError(false);
          props.grp_handler(true);
        }
      })
      .catch(function (error) {
        console.error("Group ID could not be found");
        props.grp_handler(false);
        setError(true);
        return Promise.reject(error);
      });
    return () => (mounted = false);
  }, []);

  return error === true ? (
    <h1 className="oauthtext">Group ID could not be found</h1>
  ) : (
    <h1 className="oauthtext">Groups Found</h1>
  );
}
