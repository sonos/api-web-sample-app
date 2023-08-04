import { useRecoilState } from "recoil";
import React from "react";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";
import GroupPlaybackComponent from "./groupPlaybackComponent";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import {useNavigate} from "react-router-dom";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";

/**
 * Wrapper functional component for GroupPlaybackComponent class
 * The Recoil atom states are passed through props to GroupPlaybackComponent
 * @param props.householdId {string} targets specific household in Sonos API
 * @param props.groupId {string} targets specific group when fetching current playback state from Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @returns elements for use by GroupPlaybackComponent for use in groupPlaybackComponent.jsx
 */
export default function GroupPlaybackComponentWrapper(props) {
  // Accesses and modifies the states of selectedGroupAtom, groupsInfoAtom, and playbackStateAtom
  const [groupState, setGroupState] = useRecoilState(selectedGroupAtom);
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);

  // Used by BackButton and GroupGoneRoutingController to navigate to previous page
  let navigate = useNavigate();

  return (<GroupPlaybackComponent
    navigate={navigate}
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={groupState}
    setState={setGroupState}
    householdId={props.householdId}
    groupsInfoState={groupsInfoState}
    playback = {playbackState}
  />);
}
