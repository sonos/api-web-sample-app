import {GroupVolumeApiFactory} from "../museClient/api";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import volumeAtom from "../Recoil/volumeAtom";
import {useRecoilState} from "recoil";

/**
 * Fetches group volume from Sonos API and sets state of volumeAtom
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @param props.groupId {string} Used to target specific group when calling Sonos API
 */
export default function GetGroupVolume(props) {
  // volumeState (unused) accesses and setVolumeState modifies volumeAtom's state
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);

  // Used to make group volume Sonos API calls with our access token and configuration
  const groupVolumeApi = new GroupVolumeApiFactory(props.museClientConfig);

  // Fetches current group volume from Sonos API, processes response through VolumeHandler, and sets volumeAtom's state
  groupVolumeApi
    .groupVolumeGetVolume(props.groupId)
    .then((res) => {
      setVolumeState(VolumeHandler(res));
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });
}
