import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import { useEffect, useState } from "react";
import axios from "axios";


const apiCall = () => {
  let end_point_ = config.api_end_points.household_api_url;
  console.log(end_point_);
  const authentication = new Authentication();
  const headers_ = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + authentication.get_access_token(),
  };
  console.log(headers_);

  return axios({
    url: end_point_,
    method: "get",
    headers: headers_,
  });
};

export default function GetHousehold(props) {

  console.log("House hold method called...")

  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    let mounted = true;
    apiCall()
      .then((res) => {
        if (mounted) {
          console.log(res.data);
          let household_id = res.data["households"][0]["id"];
          setResponse(household_id);
          setError(false);
          props.hh_handler(true);
        }
      })
      .catch(function (error) {
        console.log("Something went wrong");
        setError(true);
        return Promise.reject(error);
      });
    return () => (mounted = false);
  }, []);

  window.localStorage.setItem("household_id", response);
  console.log("Loaded from storage : ", window.localStorage.household_id);

  return error === true ? (
    <div>
      <br/>
      <h1 align="center">No device detected...</h1>
    </div>
  ) : (
    <h1></h1>
  );
}
