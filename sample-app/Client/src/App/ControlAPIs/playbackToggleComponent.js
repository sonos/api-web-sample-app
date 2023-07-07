import { PlaybackApi } from "../museClient/api";
import PlaybackStateHandler from "../MuseDataHandlers/PlaybackStateHandler";
import {useRecoilState} from "recoil";
import playbackStateAtom from "../Recoil/playbackStateAtom";

export default function StateAtStart(props) {
  const [playbackStateResponse, setPlaybackStateResponse] = useRecoilState(playbackStateAtom);
  const playBackApi = new PlaybackApi(props.museClientConfig);

  playBackApi
    .playbackGetPlaybackStatus(props.deviceId)
    .then((res) => {
      console.debug(" State at start is : ", res.playbackState);
      setPlaybackStateResponse(PlaybackStateHandler(res));
    })
    .catch(function (error) {
      console.error("Error in fetching the state at start: ", error);
    });
}
