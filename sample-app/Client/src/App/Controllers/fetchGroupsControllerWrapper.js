import { useRecoilState } from "recoil";
import React from "react";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import FetchGroups from "./fetchGroupsController";
import {useNavigate} from "react-router-dom";

export default function FetchGroupsControllerWrapper(props) {
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  // setGroupsInfoState({
  //   group_flag: true,
  //   groups: groupsInfoState.groups,
  //   players: groupsInfoState.players
  // });
  let navigate = useNavigate();
  return (<FetchGroups
    household_id={props.household_id}
    museClientConfig={props.museClientConfig}
    groupsInfoState={groupsInfoState}
    setGroupsInfoState={setGroupsInfoState}
    navigate={navigate}
  />);
}
