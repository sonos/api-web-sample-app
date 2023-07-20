import { useRecoilState } from "recoil";
import React from "react";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupPlayersComponent from "./groupPlayersComponent";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import {useNavigate} from "react-router-dom";

export default function GroupPlayersComponentWrapper(props) {
  const [groupState, setGroupState] = useRecoilState(groupStatusAtom);
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  let navigate = useNavigate();
  let playersInGroup = {}
  JSON.parse(props.players).map((player) => {
    playersInGroup[player.id] = false;
  });
  JSON.parse(props.group).playerIds.map((playerId) => {
    playersInGroup[playerId] = true;
  });
  return (<GroupPlayersComponent
    navigate={navigate}
    group={props.group}
    museClientConfig={props.museClientConfig}
    players={props.players}
    playersInGroup={playersInGroup}
    state={groupState}
    setState={setGroupState}
    playback = {playbackState}
  />);
}
