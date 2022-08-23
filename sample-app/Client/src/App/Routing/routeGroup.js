import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupPlayersComponent from "../Components/groupPlayersComponent";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";

function RouteGroup() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/");
    }

    // Redirect the user to login page
    if (new Authentication().isAccessTokenValid() !== true) {
      navigate("/");
    }
  }, []);

  if ((state !== null) & (new Authentication().isAccessTokenValid() === true)) {
    const { group, players } = state;
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });
    return <GroupPlayersComponent group={group} museClientConfig={museClientConfig} players={players}/>;
  }
}

export default RouteGroup;
