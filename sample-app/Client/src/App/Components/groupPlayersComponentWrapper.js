import { useRecoilState } from "recoil";
import React from "react";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupPlayersComponent from "./groupPlayersComponent";

export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(groupStatusAtom);
  return (<GroupPlayersComponent
    group={props.group}
    museClientConfig={props.museClientConfig}
    players={props.players}
    state={groupState}
    setState={setGroupState}
  />);
}
