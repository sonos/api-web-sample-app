import { useRecoilState } from "recoil";
import React from "react";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import FetchGroups from "./fetchGroupsController";
import {useNavigate} from "react-router-dom";

/**
 * Wrapper functional component for FetchGroupsController class
 * Necessary because useRecoilState() (a hook) cannot be called inside a class component
 * useRecoilState() is used to access and modify the state of groupsInfoAtom, which keeps track of all groups and players in selected household
 * @param props.householdId {string} Used to target current household in Sonos API calls
 * @param props.museClientConfig {JSON} Contains access token and configuration for Sonos API calls
 * @returns {JSX.Element} FetchGroups class component
 */
export default function FetchGroupsControllerWrapper(props) {
  // groupsInfoState accesses state and setGroupsInfoState modifies state of groupsInfoAtom
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);

  // Used to route user to group player and send data to new location
  let navigate = useNavigate();

  // Returns a FetchGroups component with the ability to access and modify groupsInfoAtom through props
  return (<FetchGroups
    householdId={props.householdId}
    museClientConfig={props.museClientConfig}
    groupsInfoState={groupsInfoState}
    setGroupsInfoState={setGroupsInfoState}
    navigate={navigate}
  />);
}
