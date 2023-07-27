/** 
 * The PlaybackStateHandler function is passed the parameter "requestData" 
 * "PLAYBACK_STATE_PLAYING" and "PLAYBACK_STATE_BUFFERING" are string literals representing two possible playback states
 * @param requestData.playbackState {string} holds the current state of playback 
 * @param requestData.availablePlaybackActions {boolean} returns true for available playback actions
*/
export default function PlaybackStateHandler(requestData) {
  try {
    const playBackState =
      requestData.playbackState === "PLAYBACK_STATE_PLAYING" || requestData.playbackState === "PLAYBACK_STATE_BUFFERING";
    const res = {
      isPlaying: playBackState,
      getStateFlag: false,
      canSkip: requestData.availablePlaybackActions.canSkip,
      canSkipBack: requestData.availablePlaybackActions.canSkipBack,
      canSeek: requestData.availablePlaybackActions.canSeek
    };
    return res;
  } catch (e) {
    console.error("Error in fetching the playback state from the event", e);
  }
}
