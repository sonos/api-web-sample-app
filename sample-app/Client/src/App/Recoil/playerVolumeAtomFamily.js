import { atomFamily } from "recoil"

/**
 * Recoil atomFamily that allows for keeping track of the volume states of a variable number of players
 * A player's volume state can be accessed and modified by calling useRecoilState(playerVolumeAtomFamily({player ID})
 */
const playerVolumeAtomFamily = atomFamily({
  key: 'playerVolumeAtomFamily',  // unique ID (with respect to other atoms/selectors)
  default: {
    getStartVolumeFlag: true,  // {boolean} If true, getPlayerVolume is called and player volume state is fetched from Sonos API
    volumeVal: 0  // {number} Volume value of player. Player volume slider is set to this value
  }
});

export default playerVolumeAtomFamily;
