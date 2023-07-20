import { useRecoilState } from "recoil";
import React from "react";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import FetchGroups from "./fetchGroupsController";
import {useNavigate} from "react-router-dom";

export default function FetchGroupsControllerWrapper(props) {
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  let navigate = useNavigate();
  return (<FetchGroups
    householdId={props.householdId}
    museClientConfig={props.museClientConfig}
    groupsInfoState={groupsInfoState}
    setGroupsInfoState={setGroupsInfoState}
    navigate={navigate}
  />);
}
