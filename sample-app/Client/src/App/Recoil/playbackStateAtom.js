import { atom } from "recoil"

/** 
 * Recoil atom that keeps track of the playback state of the currently displayed group on the group player page
 * Can be accessed and modified by calling useRecoilState(playbackStateAtom)
 */
const playbackStateAtom = atom({
  key: 'playbackStateAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    isPlaying: false,  // {boolean} Determines state of play/pause button on group player page
    getStateFlag: true, // {boolean} If true, GetPlaybackState is called and current playback state is fetched from Sonos API
    canSkip: false,   // {boolean} Determines functionality of skip button
    canSkipBack: false,  // {boolean} Determines functionality of skip back button
    canSeek: false  // {boolean} Determines functionality of skip back button. Seek is needed when restarting track (seek to position 0)
  },
});

export default playbackStateAtom
