import React from "react";
import { useLocation } from "react-router-dom";
import Control from "../Components/controlComponent";

function HelperGroupControl() {
  const location = useLocation();
  const state = location.state;

  const { group } = state;

  return <Control group={group} />;
}

export default HelperGroupControl;
