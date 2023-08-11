import { atom } from "recoil"

/** 
 * Recoil atom that keeps track of the playback state of the currently displayed group on the group playback page
 * Can be accessed and modified by calling useRecoilState(playbackStateAtom)
 */
const playbackStateAtom = atom({
  key: 'playbackStateAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    isPlaying: false,  // {boolean} Determines state of play/pause button on group playback page
    getStateFlag: true, // {boolean} If true, GetPlaybackState is called and current playback state is fetched from Sonos API
    canSkip: false,   // {boolean} Determines functionality of skip button
    canSkipBack: false,  // {boolean} Determines functionality of skip back button
    canSeek: false,  // {boolean} Determines functionality of skip back button. Seek is needed when restarting track (seek to position 0)
    repeat: false,  // {boolean} Determines state of repeat button on group playback page
    repeatOne: false,  // {boolean} Determines state of repeat button on group playback page
    shuffle: false,  // {boolean} Determines state of shuffle button on group playback page
    canRepeat: false,  // {boolean} Determines whether repeat button is shown on group playback page
    canRepeatOne: false,  // {boolean} Determines whether repeat button is shown on group playback page
    canShuffle: false  // {boolean} Determines whether shuffle button is shown on group playback page
  },
});

export default playbackStateAtom
