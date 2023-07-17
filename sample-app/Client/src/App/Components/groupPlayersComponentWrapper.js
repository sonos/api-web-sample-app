import { useRecoilState } from "recoil";
import React from "react";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import {useState} from "react";

export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(groupStatusAtom);
  const [skipBack, setSkipBack] = useState(false);
  const [skipForward, setSkipForward] = useState(false);
  return (<GroupPlayersComponent
    group={props.group}
    museClientConfig={props.museClientConfig}
    players={props.players}
    state={groupState}
    setState={setGroupState}
    skipBack={skipBack}
    setSkipBack={setSkipBack}
    skipForward={skipForward}
    setSkipForward={setSkipForward}
  />);
}
