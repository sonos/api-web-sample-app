import { atom } from "recoil"

/**
 * Recoil atom that keeps track of the currently displayed group's volume state
 * Can be accessed and modified by calling useRecoilState(volumeAtom)
 */
const volumeAtom = atom({
 key: 'volumeAtom',  // unique ID (with respect to other atoms/selectors)
 default: {
  volumeVal: 0,  // Volume value of currently displayed group. Group volume slider is set to this value
  getStartVolumeFlag: true,  // If true, getGroupVolume is called and current group's volume status is fetched from Sonos API
 },
});

export default volumeAtom
