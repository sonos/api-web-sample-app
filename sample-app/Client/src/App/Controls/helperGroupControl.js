import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupPlayersComponent from "../Components/GroupPlayersComponent";
import Authentication from "../Authentication/Authentication";
import { Configuration } from "../museClient/configuration";

function HelperGroupControl() {
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
    const { group } = state;
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });
    return <GroupPlayersComponent group={group} museClientConfig={museClientConfig} />;
  }
}

export default HelperGroupControl;
