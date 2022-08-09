import { useEffect, useState } from "react";
import Helper from "../Utility/helper";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";

export default function Groups(props) {
  const [error, setError] = useState([]);
  
  const helper = new Helper();

  useEffect(() => {
    
    let mounted = true;

    const HOUSEHOLD_ID = helper.getHouseHoldIdFromStorage();
    
    const groupsApi = new GroupsApiFactory(props.museClientConfig);
    groupsApi.groupsGetGroups(HOUSEHOLD_ID)
    .then((groupsAPIresponse) => {
      console.log(groupsAPIresponse);
      if (mounted) {
        window.localStorage.setItem(
          "groups",
          JSON.stringify(groupsAPIresponse["groups"])
        );
        window.localStorage.setItem(
          "players",
          JSON.stringify(groupsAPIresponse["players"])
        );
        setError(false);
        props.grp_handler(true);
      }
    })
    .catch(function (error) {
      console.log(error);
      console.error("Group IDs could not be found");
      props.grp_handler(false);
      setError(true);
      return Promise.reject(error);
    });
    return () => (mounted = false);
  }, []);

  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">Groups in this household could not be found.</h1>
    </div>
  ) : (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );

}
