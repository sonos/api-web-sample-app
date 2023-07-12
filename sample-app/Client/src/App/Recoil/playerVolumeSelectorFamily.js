import { selectorFamily } from "recoil"
import playerVolumeAtomFamily from "./playerVolumeAtomFamily";

const playerVolumeSelectorFamily = selectorFamily({
  key: 'playerVolumeSelectorFamily',
  get: (playerID) => ({ get }) => {
    return get(playerVolumeAtomFamily((playerID)));
  },
  set: (playerID) => ({set}, val) => {
    set(playerVolumeAtomFamily(playerID), val);
  }
});

export default playerVolumeSelectorFamily;
