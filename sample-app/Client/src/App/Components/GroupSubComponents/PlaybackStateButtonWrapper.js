import PlaybackStateButton from "./playbackStateButton";
import { useRecoilState } from "recoil";
import playbackStateAtom from "../../Recoil/playbackStateAtom";
import React from "react";

export default function PlaybackStateButtonWrapper(props) {
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  return (<PlaybackStateButton
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={playbackState}
    setState={setPlaybackState}
  />);
}
