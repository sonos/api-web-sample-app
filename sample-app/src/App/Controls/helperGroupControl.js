import React from "react";
import { useLocation } from "react-router-dom";
import GroupPlayersComponent from "../Components/GroupPlayersComponent";

function HelperGroupControl() {
  const location = useLocation();
  const state = location.state;

  const { group } = state;

  return <GroupPlayersComponent group={group} />;
}

export default HelperGroupControl;
