import { useEffect, useState } from "react";
import React from "react";
import { CircularProgress } from '@mui/material';
import HeaderComponent from "../Components/headerComponent";
import { HouseholdsApiFactory } from "../museClient/api";

/**
 * Gets a list of households from the Sonos API
 * @param props.hh_handler Handler function that updates list of households in fetchHouseholdsController
 * @returns {JSX.Element} If no households are found, returns display informing user. Otherwise, display loading screen
 */
export default function GetHouseholds(props) {
  // error value determines if loading screen or "No device..." screen is returned
  const [error, setError] = useState(false);

  useEffect(() => {
    // Used to make household Sonos API calls
    const householdsApi = new HouseholdsApiFactory(props.museClientConfig);

    // Fetches households from Sonos API, calls handler function to update fetchHouseholdsController
    householdsApi.householdsGetHouseholds()
    .then((houseHoldsResponse) => {
      setError(false);
      props.hh_handler(houseHoldsResponse["households"]);
    })
    .catch(function (error) {
      setError(true);
      return Promise.reject(error);
    });
  }, []);

  // If an error was encountered with the Sonos API call, display error screen. Otherwise, continue and show loading screen
  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">No device connected to the network...</h1>
    </div>
  ) : (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );
}
