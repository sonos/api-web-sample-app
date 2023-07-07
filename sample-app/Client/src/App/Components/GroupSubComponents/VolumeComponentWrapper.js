import VolumeComponent from "./volumeComponent";
import { useRecoilState } from "recoil";
import volumeAtom from "../../Recoil/volumeAtom";
import React from "react";

export default function VolumeComponentWrapper(props) {
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);
  return (<VolumeComponent
    groupID={props.groupID}
    museClientConfig={props.museClientConfig}
    state={volumeState}
    setState={setVolumeState}
  />);
}
