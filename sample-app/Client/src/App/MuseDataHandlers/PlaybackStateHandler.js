/**
 * Function that converts raw Sonos API playback response into usable format for playbackStateAtom
 * See https://devdocs.sonos.com/reference/playback-getplaybackstatus for Sonos API response example
 * @param requestData {JSON} Sonos API response for getPlaybackStatus or playback event
 * @return {{getStateFlag: boolean, isPlaying: boolean, canSkip: boolean, canSkipBack: boolean, canSeek: boolean}}
 *    getStateFlag is false since playback state has been retrieved. Boolean values describing the current playback's possible actions
*/
export default function PlaybackStateHandler(requestData) {
  try {
    // Determines state of play/pause button on group playback page
    const playBackState = requestData.playbackState === "PLAYBACK_STATE_PLAYING" || requestData.playbackState === "PLAYBACK_STATE_BUFFERING";

    // playbackStateAtom is set to equal return value
    return {
      isPlaying: playBackState,
      getStateFlag: false,
      canSkip: requestData.availablePlaybackActions.canSkip,
      canSkipBack: requestData.availablePlaybackActions.canSkipBack,
      canSeek: requestData.availablePlaybackActions.canSeek,
      repeat: requestData.playModes.repeat,
      repeatOne: requestData.playModes.repeatOne,
      shuffle: requestData.playModes.shuffle,
      canRepeat: requestData.availablePlaybackActions.canRepeat,
      canRepeatOne: requestData.availablePlaybackActions.canRepeatOne,
      canShuffle: requestData.availablePlaybackActions.canShuffle
    };
  } catch (e) {
    console.error("Error in fetching the playback state from the event", e);
  }
}
