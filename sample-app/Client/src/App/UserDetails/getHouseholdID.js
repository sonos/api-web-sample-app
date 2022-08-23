import { useEffect, useState } from "react";
import React from "react";
import { CircularProgress } from '@mui/material';
import HeaderComponent from "../Components/headerComponent";
import { HouseholdsApiFactory } from "../museClient/api";

export default function GetHousehold(props) {

  const [households, setResponse] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {

    let mounted = true;

    const householdsApi = new HouseholdsApiFactory(props.museClientConfig);
    householdsApi.householdsGetHouseholds()
    .then((houseHoldsResponse) => {
      if (mounted) {
        setResponse(houseHoldsResponse["households"]);
        setError(false);
        props.hh_handler(false, houseHoldsResponse["households"]);
      }
    })
    .catch(function (error) {
      setError(true);
      return Promise.reject(error);
    });
    return () => (mounted = false);
  }, []);

  
  return error === false ? (
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
