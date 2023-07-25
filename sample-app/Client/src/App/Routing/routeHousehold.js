import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";
import FetchGroupsControllerWrapper from "../Controllers/fetchGroupsControllerWrapper";


function RouteHousehold() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null || state === undefined || !(new Authentication().isAccessTokenValid())) {
      navigate("/");
    }
  }, []);

  if (state !== null && (new Authentication().isAccessTokenValid())) {
    const { householdId } = state;
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });
    return <FetchGroupsControllerWrapper householdId={householdId} museClientConfig={museClientConfig} />;
  }
}

export default RouteHousehold;
