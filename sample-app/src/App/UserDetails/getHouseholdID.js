import config from "../../config.json";
import { useEffect, useState } from "react";
import Helper from "../Utility/helper";
import { METHOD_GET } from "../Utility/constants";

import React from "react";

export default function GetHousehold(props) {
  console.debug("Start GetHousehold()");

  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {
    console.debug("Start GetGroups()");
    let mounted = true;

    let endPoint = config.api_end_points.household_api_url;

    const headers = helper.getHeaderBearer()

    const data = {};

    helper.apiCall(endPoint, headers, METHOD_GET, data)
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
  console.debug("End GetHousehold()");
  return error === true ? (
    <div>
      <br />
      <h1 className="oauthtext">No device detected...</h1>
    </div>
  ) : (
    <h1 className="oauthtext">Household ID found</h1>
  );

}
