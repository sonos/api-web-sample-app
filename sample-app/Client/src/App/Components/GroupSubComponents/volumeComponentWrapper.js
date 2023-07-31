import VolumeComponent from "./volumeComponent";
import { useRecoilState } from "recoil";
import volumeAtom from "../../Recoil/volumeAtom";
import React from "react";

/**
 * Wrapper functional component for VolumeComponent class
 * Allows VolumeComponent to access and modify the state of volumeAtom
 * Necessary because useRecoilState() (a hook) cannot be called inside a class component
 * @param props.groupId {string} Used to target specific group when fetching current group volume from Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @returns {JSX.Element} VolumeComponent
 */
export default function VolumeComponentWrapper(props) {
  // volumeState accesses the state of volumeAtom, setVolumeAtom modifies the state of volumeAtom
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);
  return (<VolumeComponent
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={volumeState}
    setState={setVolumeState}
  />);
}
