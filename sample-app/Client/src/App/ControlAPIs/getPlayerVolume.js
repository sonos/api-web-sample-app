import {PlayerVolumeApiFactory} from "../museClient/api";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import {useRecoilState} from "recoil";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";

export default function GetPlayerVolume(props) {
  const [volumeState, setVolumeState] = useRecoilState(playerVolumeAtomFamily(props.deviceId));
  const playerVolumeApi = new PlayerVolumeApiFactory(props.museClientConfig);
  playerVolumeApi
    .playerVolumeGetVolume(props.deviceId)
    .then((res) => {
      console.debug(props.deviceType + " volume at start is : ", res);
      const data = VolumeHandler(res);
      data.inGroup = props.state.inGroup;
      setVolumeState(data);
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });
}
