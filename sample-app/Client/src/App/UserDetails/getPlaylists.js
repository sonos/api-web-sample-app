import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import {PlaylistsApiFactory} from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";

/**
 * Fetches current household's playlists from Sonos API
 * @param props.playlistsHandler Handler function that updates stored playlists array in PlaylistsController
 * @param props.museClientConfig {JSON} Contains Sonos API access token and configuration
 * @param props.householdId {string} Used to target current household in Sonos API call
 */
export default function GetPlaylists(props) {
  // error is set to true if error has been encountered. False by default
  const [error, setError] = useState(false);

  useEffect(() => {
    // Used to make playlists Sonos API calls with currently stored access token and configuration
    const PlaylistsApi = new PlaylistsApiFactory(props.museClientConfig);

    // Fetches current playlists from Sonos API
    PlaylistsApi.playlistsGetPlaylists(props.householdId)
      .then((playlistsApiResponse) => {
        // Processes API response and updates state in PlaylistsController
        props.playlistsHandler(playlistsApiResponse.playlists)

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
      <h1 className="oauthtext">Playlists in this household could not be found.</h1>
    </div>
  ) : (
    <div className="render_page_small">
      <CircularProgress color="inherit" />
    </div>
  );
}
