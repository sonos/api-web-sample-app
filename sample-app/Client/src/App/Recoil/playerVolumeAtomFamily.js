import { atomFamily } from "recoil"

const playerVolumeAtomFamily = atomFamily({
  key: 'playerVolumeAtomFamily',
  default: { volumeVal: 0, getStartVolumeFlag: true, inGroup: false }
});

export default playerVolumeAtomFamily;
