import { useRecoilState } from "recoil";
import playbackMetadataAtom from "../../Recoil/playbackMetadataAtom";
import React from "react";
import PlayBackMetaDataComponent from "./playbackMetaDataComponent";

export default function PlaybackMetaDataComponentWrapper(props) {
  const [playbackMetadataState, setPlaybackMetadataState] = useRecoilState(playbackMetadataAtom);
  return (<PlayBackMetaDataComponent
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={playbackMetadataState}
    setState={setPlaybackMetadataState}
  />);
}
