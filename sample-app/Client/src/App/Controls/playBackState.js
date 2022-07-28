import { PlaybackApi } from "../museClient/api";

export default function StateAtStart(props) {

  const playBackApi = new PlaybackApi(props.configuration);

  playBackApi.playbackGetPlaybackStatus(props.deviceId)
  .then((res) => {
    console.debug(
      " State at start is : ",
      res.playbackState
    );
    props.getStateHandler(
      false,
      res.playbackState === "PLAYBACK_STATE_PLAYING"
    );
  })
  .catch(function (error) {
    console.error("Error", error);
  });
}
