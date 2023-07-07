export default function PlaybackStateHandler(requestData) {
  try {
    const playBackState =
      requestData.playbackState === "PLAYBACK_STATE_PLAYING" || requestData.playbackState === "PLAYBACK_STATE_BUFFERING";
    const res = {
      isPlaying: playBackState,
      getStateFlag: false
    };
    console.log(res);
    return res;
  } catch (e) {
    console.log("Error in fetching the playback state from the event", e);
  }
}
