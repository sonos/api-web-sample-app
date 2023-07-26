import { useRecoilState } from "recoil";
import React from "react";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";
import PlayerComponent from "./playerComponent";

/**
 * Wrapper functional component for PlayerComponent class
 * Allows PlayerComponent to access and modify the state of an atom in playerVolumeAtomFamily
 * Necessary because useRecoilState() (a hook) cannot be called inside a class component
 * @param props.playerId {string} Used to target specific player in Sonos API calls and in playerVolumeAtomFamily
 * @param props.playerName {string} Name of player displayed
 * @param props.group {JSON} Information of currently displayed group
 * @param props.museClientConfig {JSON} Contains access token for Sonos API calls
 * @param props.inGroup {boolean} True if player is in current group, false otherwise. Obtained from groupsInfoAtom
 * @returns {JSX.Element} PlayerComponent
 */
export default function PlayerComponentWrapper(props) {
  // volState accesses the state of playerVolumeAtomFamily atom, setVolState modifies the state of playerVolumeAtomFamily atom
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
