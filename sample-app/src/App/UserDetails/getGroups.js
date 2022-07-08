import config from "../../config.json";
import { useEffect, useState } from "react";
import Helper from "../Utility/helper";
import { METHOD_GET } from "../Utility/constants";

import React from "react";

export default function GetGroups(props) {
  console.debug("Start GetGroups");

  const [error, setError] = useState([]);
  
  const helper = new Helper();

  useEffect(() => {
    let mounted = true;

    const HOUSEHOLD_ID = helper.getHouseHoldIdFromStorage();
    //localStorage.getItem("household_id");
    
    let endPoint =
    helper.getHouseHoldURL() + "/" + HOUSEHOLD_ID + "/groups";
    
    const headers = helper.getHeaderBearer()

    const data = {};

    helper.apiCall(endPoint, headers, METHOD_GET, data)
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
  
  console.debug("End GetGroups()");

  return error === true ? (
    <h1 className="oauthtext">Group ID could not be found</h1>
  ) : (
    <h1 className="oauthtext">Groups Found</h1>
  );

}
