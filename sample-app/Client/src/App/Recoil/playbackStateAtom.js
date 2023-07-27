import { atom } from "recoil"

/** 
 * Recoil atom that keeps track of the playback state of the currently displayed group on the group player page
 * Can be accessed and modified by calling useRecoilState(playbackStateAtom)
 */
const playbackStateAtom = atom({
  key: 'playbackStateAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    isPlaying: false,  // If playback isPlaying, set to true
    getStateFlag: true, // If true, current state is fetched
    canSkip: false,   // If playback canSkip, set to true
    canSkipBack: false,  // If playback canSkipBack, set to true
    canSeek: false  // If playback canSeek, set to true
  },
});

export default playbackStateAtom
