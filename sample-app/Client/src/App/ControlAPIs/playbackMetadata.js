import { PlaybackMetadataApiFactory } from "../museClient/api";
import PlaybackMetadataHandler from "../MuseDataHandlers/PlaybackMetadataHandler";
import {useRecoilState} from "recoil";
import playbackMetadataAtom from "../Recoil/playbackMetadataAtom";

/**
 * Fetches current playback metadata from Sonos API and sets playbackMetadataAtom's state
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @param props.groupId {string} Used to target specific group when calling Sonos API
 */
export default function PlayBackMetadata(props) {
  // playbackMetadataResponse (unused) accesses and setPlaybackMetadataResponse modifies playbackMetadataAtom's state
  const [playbackMetadataResponse, setPlaybackMetadataResponse] = useRecoilState(playbackMetadataAtom);

  // Used to make playback metadata Sonos API calls with currently stored access token and configuration
  const playBackMetadataApi = new PlaybackMetadataApiFactory(props.museClientConfig);

  // Fetches current playback metadata from Sonos API, processes response through PlaybackMetadataHandler, and sets playbackMetadataAtom's state
  playBackMetadataApi
    .playbackMetadataGetMetadataStatus(props.groupId)
    .then((res) => {
      setPlaybackMetadataResponse(PlaybackMetadataHandler(res));
    })
    .catch(function (error) {
      console.error("Error", error);
    });
}
