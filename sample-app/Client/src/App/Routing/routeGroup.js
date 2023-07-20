import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";
import GroupPlayersComponentWrapper from "../Components/groupPlayersComponentWrapper";

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
    const { householdId, groupId } = state;
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });
    return <GroupPlayersComponentWrapper
      groupId={groupId}
      museClientConfig={museClientConfig}
      householdId={householdId}
    />;
  }
}

export default RouteGroup;
