import { useEffect, useState } from "react";
import Helper from "../Utility/Helper";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";

export default function Groups(props) {
  const [error, setError] = useState([]);
  
  const helper = new Helper();

  useEffect(() => {
    
    let mounted = true;

    const HOUSEHOLD_ID = helper.getHouseHoldIdFromStorage();
    
    const groupsApi = new GroupsApiFactory(props.museClientConfig);
    groupsApi.groupsGetGroups(HOUSEHOLD_ID)
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
    
    /*
    let endPoint =
    helper.getHouseHoldURL() + "/" + HOUSEHOLD_ID + "/groups";
    
    const headers = helper.getHeaderBearer()

    const data = {};

    helper.apiCall(endPoint, headers, "GET", data)
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
      });*/
    return () => (mounted = false);
  }, []);

  return error === true ? (
    <h1 className="oauthtext">Group ID could not be found</h1>
  ) : (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );

}
