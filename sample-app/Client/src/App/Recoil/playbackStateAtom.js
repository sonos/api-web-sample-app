import { atom } from "recoil"

const playbackStateAtom = atom({
  key: 'playbackStateAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    isPlaying: false,
    getStateFlag: true,
    canSkip: false,
    canSkipBack: false
  },
});

export default playbackStateAtom
