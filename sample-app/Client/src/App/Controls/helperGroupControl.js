import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Control from "../Components/controlComponent";
import Authentication from "../Authentication/Authentication";
import { Configuration } from "../museClient/configuration";

function HelperGroupControl() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state === null || state === undefined) {
      navigate("/");
    }

    // Redirect the user to login page
    if (new Authentication().isAccessTokenValid() !== true) {
      navigate("/");
    }
  }, []);

  if ((state !== null) & (new Authentication().isAccessTokenValid() === true)) {
    const { group } = state;
    const museClientConfig = new Configuration({
      accessToken: JSON.parse(window.localStorage.access_token).token,
    });
    return <Control group={group} museClientConfig={museClientConfig} />;
  }
}

export default HelperGroupControl;
