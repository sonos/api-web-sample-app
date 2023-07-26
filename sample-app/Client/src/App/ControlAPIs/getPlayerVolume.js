import {PlayerVolumeApiFactory} from "../museClient/api";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import {useRecoilState} from "recoil";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";

/**
 * Fetches player volume from Sonos API and sets state of Atom in playerVolumeAtomFamily
 * @param props.museClientConfig {JSON} Contains access token for Sonos API call
 * @param props.playerId {string} Used to target specific player when calling Sonos API
 */
export default function GetPlayerVolume(props) {
  // volumeState (unused) accesses and setVolumeState modifies the relevant Atom in playerVolumeAtomFamily's state
  const [volumeState, setVolumeState] = useRecoilState(playerVolumeAtomFamily(props.playerId));

  // Used to make player volume Sonos API calls with our access token and configuration
  const playerVolumeApi = new PlayerVolumeApiFactory(props.museClientConfig);

  // Fetches current player volume from Sonos API, processes response through VolumeHandler, and sets playerVolumeAtomFamily Atom's state
  playerVolumeApi
    .playerVolumeGetVolume(props.playerId)
    .then((res) => {
      const data = VolumeHandler(res);
      setVolumeState(data);
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });
}
