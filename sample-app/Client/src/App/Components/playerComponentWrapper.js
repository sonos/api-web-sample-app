import { useRecoilState } from "recoil";
import React from "react";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";
import PlayerComponent from "./playerComponent";

export default function PlayerComponentWrapper(props) {
  const [volState, setVolState] = useRecoilState(playerVolumeAtomFamily(props.playerId));
  return (<PlayerComponent
    key={props.playerId}
    playerId={props.playerId}
    playerName={props.playerName}
    museClientConfig={props.museClientConfig}
    group={props.group}
    state={volState}
    setState={setVolState}
    inGroup={props.inGroup}
  />);
}
