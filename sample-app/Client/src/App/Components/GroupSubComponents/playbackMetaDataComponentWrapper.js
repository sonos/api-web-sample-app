import { useRecoilState } from "recoil";
import playbackMetadataAtom from "../../Recoil/playbackMetadataAtom";
import React from "react";
import PlayBackMetaDataComponent from "./playbackMetaDataComponent";

/**
 * Wrapper functional component for PlaybackMetaDataComponent class
 * Allows PlayBackMetaDataComponent to access and modify the state of playbackMetadataAtom
 * Necessary because useRecoilState() (a hook) cannot be called inside a class component
 * @param props.groupId {string} Used to target specific group when fetching current playback metadata from Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @returns {JSX.Element} PlaybackMetaDataComponent
 */
export default function PlaybackMetaDataComponentWrapper(props) {
  // playbackMetadataState accesses the state of playbackMetadataAtom, setPlaybackMetadataState modifies the state of playbackMetadataAtom
  const [playbackMetadataState, setPlaybackMetadataState] = useRecoilState(playbackMetadataAtom);
  return (<PlayBackMetaDataComponent
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={playbackMetadataState}
    setState={setPlaybackMetadataState}
  />);
}
