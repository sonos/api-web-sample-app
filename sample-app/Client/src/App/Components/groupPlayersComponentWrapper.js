import { useRecoilState } from "recoil";
import React from "react";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import {useNavigate} from "react-router-dom";

export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(groupStatusAtom);
  let navigate = useNavigate();
  return (<GroupPlayersComponent
    navigate={navigate}
    group={props.group}
    museClientConfig={props.museClientConfig}
    players={props.players}
    state={groupState}
    setState={setGroupState}
  />);
}
