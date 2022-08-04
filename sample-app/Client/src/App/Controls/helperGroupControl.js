import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupPlayersController from "../Controllers/GroupPlayersController";
import Authentication from "../Authentication/Authentication";
import { Configuration } from "../museClient/configuration";

function HelperGroupControl() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const museClientConfig = new Configuration({accessToken : JSON.parse(window.localStorage.accessToken).token});


  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/error-page");
    }

    // Redirect the user to login page
    if (new Authentication().isAccessTokenValid() !== true) {
      navigate("/");
    }
  }, []);

  if ((state !== null) & (new Authentication().isAccessTokenValid() === true)) {
    const { group } = state;
    
    return <GroupPlayersController group={group} museClientConfig = {museClientConfig}/>;

  }
}

export default HelperGroupControl;
