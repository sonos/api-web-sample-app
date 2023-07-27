import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import { FavoritesApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";

/**
 * Fetches current household's favorites from Sonos API
 * @param props.favoritesHandler Handler function that updates stored favorites array in FavoritesController
 * @param props.museClientConfig {JSON} Contains Sonos API access token and configuration
 * @param props.householdId {string} Used to target current household in Sonos API call
 */
export default function GetFavorites(props) {
  // error is set to true if error has been encountered. False by default
  const [error, setError] = useState(false);

  useEffect(() => {
    // Used to make favorites Sonos API calls with currently stored access token and configuration
    const FavoritesApi = new FavoritesApiFactory(props.museClientConfig);

    // Fetches current favorites from Sonos API
    FavoritesApi.favoritesGetFavorites(props.householdId)
      .then((favoritesApiResponse) => {
        // Processes API response and updates state in FavoritesController
        props.favoritesHandler(favoritesApiResponse.items)

        // No error encountered
        setError(false);
      })
      .catch(function (error) {
        // Error in fetching data from Sonos API. Causes error screen to be displayed
        console.error("Error", error);
        setError(true)
      });
  }, []);

  // If an error has occurred, show error screen. Otherwise, show loading symbol while data is being fetched
  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">Favorites in this household could not be found.</h1>
    </div>
  ) : (
    <div className="render_page_small">
      <CircularProgress color="inherit" />
    </div>
  );
}
