/**
 * Function that converts raw Sonos API volume response (group or player) into usable format for volumeAtom or playerVolumeAtomFamily
 * See https://devdocs.sonos.com/reference/groupvolume-getvolume for Sonos API group volume response example
 * @param requestData {JSON} Sonos API response for a group or player volume event or a group or player getVolume call
 * @return {{volumeVal: number, getStartVolumeFlag: boolean}}
 *    volume value for player or group. Boolean getStartVolumeFlag is false since volume has been retrieved
 */
export default function VolumeHandler(requestData) {
  try {
    // Value of volume slider on group or player component
    const volume = requestData.volume;

    // volumeAtom or an atom in playerVolumeAtomFamily is set to equal this return value
    return {
      getStartVolumeFlag: false,
      volumeVal: volume
    };
  } catch (e) {
    console.error("Error in fetching the volume from the event", e);
  }
}
