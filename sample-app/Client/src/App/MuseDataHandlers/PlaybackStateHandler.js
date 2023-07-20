export default function PlaybackStateHandler(requestData) {
  try {
    const playBackState =
      requestData.playbackState === "PLAYBACK_STATE_PLAYING" || requestData.playbackState === "PLAYBACK_STATE_BUFFERING";
    const res = {
      isPlaying: playBackState,
      getStateFlag: false,
      canSkip: requestData.availablePlaybackActions.canSkip,
      canSkipBack: requestData.availablePlaybackActions.canSkipBack
    };
    return res;
  } catch (e) {
    console.error("Error in fetching the playback state from the event", e);
  }
}
