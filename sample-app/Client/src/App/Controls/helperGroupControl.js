import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Control from "../Components/controlComponent";
import Authentication from "../Authentication/authentication";
import { Configuration } from "../museClient/configuration";
import Helper from "../Utility/helper";

function HelperGroupControl() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const configuration = new Configuration({accessToken : JSON.parse(window.localStorage.access_token).token});

  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/error-page");
    }

    // Redirect the user to login page
    if (new Authentication().isAccessTokenValid() !== true) {
      navigate("/");
    }
  }, []);

  if ((state !== null) & (new Authentication().isAccessTokenValid() === true)) {
    const { group } = state;
    return <Control 
            group={group} 
            configuration = {configuration}
          />;
  }
}

export default HelperGroupControl;
