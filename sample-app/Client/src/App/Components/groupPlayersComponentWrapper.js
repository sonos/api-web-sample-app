import { useRecoilState } from "recoil";
import React from "react";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import {useNavigate} from "react-router-dom";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";

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
