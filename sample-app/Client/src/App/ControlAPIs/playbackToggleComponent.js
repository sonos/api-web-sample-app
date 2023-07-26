import { PlaybackApi } from "../museClient/api";
import PlaybackStateHandler from "../MuseDataHandlers/PlaybackStateHandler";
import {useRecoilState} from "recoil";
import playbackStateAtom from "../Recoil/playbackStateAtom";

/**
 * Fetches current playback state from Sonos API and sets playbackStateAtom's state
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @param props.groupId Used to target specific group when calling Sonos API
 */
export default function StateAtStart(props) {
  // playbackStateResponse (unused) accesses and setPlaybackStateResponse modifies playbackStateAtom's state
  const [playbackStateResponse, setPlaybackStateResponse] = useRecoilState(playbackStateAtom);

  // Used to make playback Sonos API calls with our access token and configuration
  const playBackApi = new PlaybackApi(props.museClientConfig);

  // Fetches current playback state from Sonos API, processes response through PlaybackStateHandler, and sets playbackStateAtom's state
  playBackApi
    .playbackGetPlaybackStatus(props.groupId)
    .then((res) => {
      console.debug(" State at start is : ", res.playbackState);
      setPlaybackStateResponse(PlaybackStateHandler(res));
    })
    .catch(function (error) {
      console.error("Error in fetching the state at start: ", error);
    });
}
