import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";

export default function GetGroups(props) {
  const [errorValue, setError] = useState([]);

  useEffect(() => {
    
    let mounted = true;
    const HOUSEHOLD_ID = props.household_id;
    
    const groupsApi = new GroupsApiFactory(props.museClientConfig);
    groupsApi.groupsGetGroups(HOUSEHOLD_ID)
    .then((groupsAPIresponse) => {
      if (mounted) {
        setError(false);
        props.group_handler(false, groupsAPIresponse["groups"], groupsAPIresponse["players"]);
      }
    })
    .catch(function (error) {
      console.log(error);
      console.error("Group IDs could not be found");
      setError(true);
      return Promise.reject(error);
    });
    return () => (mounted = false);
  }, []);

  return errorValue === false ? (
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
