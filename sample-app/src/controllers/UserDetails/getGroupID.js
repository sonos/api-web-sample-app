import config from "../../config.json";
import Authentication from "../Authentication/authentication";
import { useEffect, useState } from "react";
import axios from "axios";

function apiCall() {
    const HOUSEHOLD_ID = localStorage.getItem("household_id");
    let end_point_ = config.api_end_points.household_api_url + "/" + HOUSEHOLD_ID + "/groups";
    console.log("Endpoint is: " + end_point_)
    const authentication = new Authentication();
    const headers_ = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authentication.get_access_token(),
    };

    return axios({
      url: end_point_,
      method: "get",
      headers: headers_,
    });
}

export default function GetGroupID(props) {

    const [error, setError] = useState([]);

    useEffect(() => {
      let mounted = true;
      apiCall()
        .then((res) => {
          if (mounted) {
            console.log("Logging : ", res.data);
            window.localStorage.setItem('groups',  JSON.stringify(res.data['groups']));
            window.localStorage.setItem('players', JSON.stringify(res.data['players']));
            setError(false);
            props.grp_handler(true);
          }
        })
        .catch(function (error) {
          console.log("Group ID could not be found");
          props.grp_handler(false);
          setError(true);
          return Promise.reject(error);
        });
      return () => (mounted = false);
    }, []);

    return error === true ? (
      <h1 align="center">Group ID could not be found</h1>
    ) : (
      <h1></h1>
    );
}
