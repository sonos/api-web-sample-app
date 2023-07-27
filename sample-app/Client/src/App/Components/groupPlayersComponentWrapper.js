import { useRecoilState } from "recoil";
import React from "react";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import {useNavigate} from "react-router-dom";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";

/**
 * Wrapper functional component for groupPlayersComponent class
 * The Recoil atom states are passed through props to GroupPlayersComponent
 * @param props.householdId {string} targets specific household in Sonos API
 * @param props.groupId {string} targets specific group when fetching current playback state from Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @returns elements for use by GroupPlayersComponent for use in groupPlayersComponent.jsx
 */
export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(selectedGroupAtom);
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  let navigate = useNavigate();
  return (<GroupPlayersComponent
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
