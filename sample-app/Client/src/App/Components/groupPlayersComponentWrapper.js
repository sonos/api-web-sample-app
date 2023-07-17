import { useRecoilState } from "recoil";
import React, {useState} from "react";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import {useNavigate} from "react-router-dom";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";

export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(groupStatusAtom);
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  let navigate = useNavigate();
  const [skipBack, setSkipBack] = useState(false);
  return (<GroupPlayersComponent
    navigate={navigate}
    groupID={props.groupID}
    museClientConfig={props.museClientConfig}
    state={groupState}
    setState={setGroupState}
    skipBack={skipBack}
    setSkipBack={setSkipBack}
    householdID={props.householdID}
    groupsInfoState={groupsInfoState}
    setGroupsInfoState={setGroupsInfoState}
  />);
}
