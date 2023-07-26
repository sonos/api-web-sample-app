import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";
import FetchGroupsControllerWrapper from "../Controllers/fetchGroupsControllerWrapper";

/**
 * Functional component that displays the list of groups for the selected household
 * User is routed to this page after clicking a household button on the households page
 * @return {JSX.Element} Through FetchGroupsControllerWrapper, a button for each group in the selected household
 */
function RouteHousehold() {
  // Used to route user to back to start page if access token has expired or if routed information has been lost
  const navigate = useNavigate();

  // Retrieves data sent to this path by householdsRoutingController
  const { state } = useLocation();

  // If data does not exist or if access token has expired, user is rerouted to start page
  useEffect(() => {
    if (state === null || state === undefined || !(new Authentication().isAccessTokenValid())) {
      navigate("/");
    }
  }, []);
  if (state !== null && (new Authentication().isAccessTokenValid())) {
    // Retrieves current household ID from current location
    const {householdId} = state;


    // Sets configuration to include access token. Used for Sonos API calls
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.accessToken).token,
    });

    // Returns FetchGroupsControllerWrapper, which through FetchGroupsController and ListGroupsComponent, displays all groups in the current household
    return <FetchGroupsControllerWrapper householdId={householdId} museClientConfig={museClientConfig}/>;
  }
}

export default RouteHousehold;
