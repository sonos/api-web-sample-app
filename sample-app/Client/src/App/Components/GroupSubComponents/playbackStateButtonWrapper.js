import PlaybackStateButton from "./playbackStateButton";
import { useRecoilState } from "recoil";
import playbackStateAtom from "../../Recoil/playbackStateAtom";
import React from "react";

/**
 * Wrapper functional component for PlaybackStateButton class
 * Allows PlaybackStateButton to access and modify the state of playbackStateAtom
 * Necessary because useRecoilState() (a hook) cannot be called inside a class component
 * @param props.groupId {string} Used to target specific group when fetching current playback state from Sonos API
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @returns {JSX.Element} PlaybackStateButton
 */
export default function PlaybackStateButtonWrapper(props) {
  // playbackState accesses the state of playbackMetadataAtom, setPlaybackState modifies the state of playbackMetadataAtom
  const [playbackState, setPlaybackState] = useRecoilState(playbackStateAtom);
  return (<PlaybackStateButton
    groupId={props.groupId}
    museClientConfig={props.museClientConfig}
    state={playbackState}
    setState={setPlaybackState}
  />);
}
