import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";
import GroupPlaybackComponentWrapper from "../Components/groupPlaybackComponentWrapper";

/**
 * Functional component that displays the GroupPlaybackComponent for the selected group
 * User is routed to this page after clicking a group button on the groups page
 * @return {JSX.Element} GroupPlaybackComponent through GroupPlaybackComponentWrapper
 */
function RouteGroup() {
  // Used to route user to back to start page if access token has expired or if routed information has been lost
  const navigate = useNavigate();

  // Retrieves data sent to this path by groupRoutingController
  const { state } = useLocation();

  // If data does not exist or if access token has expired, user is rerouted to start page
  useEffect(() => {
    if (state === null || state === undefined || !(new Authentication().isAccessTokenValid())) {
      navigate("/");
    }
  }, []);

  if (state !== null && (new Authentication().isAccessTokenValid())) {
    // Retrieves current household ID and selected group ID from current location
    const {householdId, groupId} = state;

    // Sets configuration to include access token. Used for Sonos API calls
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });

    // Returns GroupPlaybackComponent of current group through GroupPlaybackComponentWrapper
    return <GroupPlaybackComponentWrapper
      groupId={groupId}
      museClientConfig={museClientConfig}
      householdId={householdId}
    />;
  }
}

export default RouteGroup;
