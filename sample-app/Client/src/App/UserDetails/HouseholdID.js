import { useEffect, useState } from "react";
import Helper from "../Utility/helper";
import React from "react";
import { CircularProgress } from '@mui/material';
import HeaderComponent from "../Components/HeaderComponent";

export default function Household(props) {

  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {

    let mounted = true;

    let endPoint = helper.getHouseHoldURL();

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPoint, headers, "GET", data)
      .then((res) => {
        if (mounted) {
          let household_id = res.data["households"][0]["id"];
          setResponse(household_id);
          setError(false);
          props.hh_handler(true);
        }
      })
      .catch(function (error) {
        console.error("Something went wrong");
        setError(true);
        return Promise.reject(error);
      });
    return () => (mounted = false);
  }, []);

  window.localStorage.setItem("household_id", response);
  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">No device detected...</h1>
    </div>
  ) : (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );

}
