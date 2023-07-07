import { atom } from "recoil"

const volumeAtom = atom({
 key: 'volumeAtom', // unique ID (with respect to other atoms/selectors)
 default: {
  volumeVal: 40,
  getStartVolumeFlag: true,
 },
});

export default volumeAtom
