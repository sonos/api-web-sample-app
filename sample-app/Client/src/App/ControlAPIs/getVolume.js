import {GroupVolumeApiFactory, PlayerVolumeApiFactory} from "../museClient/api";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import volumeAtom from "../Recoil/volumeAtom";
import {useRecoilState} from "recoil";

export default function GetVolume(props) {
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);
  if (props.deviceType === "GROUP") {
    const groupVolumeApi = new GroupVolumeApiFactory(props.museClientConfig);
    groupVolumeApi
      .groupVolumeGetVolume(props.deviceId)
      .then((res) => {
        console.debug(props.deviceType + " volume at start is : ", res);
        setVolumeState(VolumeHandler(res));
      })
      .catch(function (error) {
        console.error("Error", error.message);
      });
  }
  else {
    const playerVolumeApi = new PlayerVolumeApiFactory(props.museClientConfig);
    playerVolumeApi
      .playerVolumeGetVolume(props.deviceId)
      .then((res) => {
        console.debug(props.deviceType + " volume at start is : ", res);
        props.getVolumeHandler(false, res.volume);
      })
      .catch(function (error) {
        console.error("Error in fetching volume at start: ", error);
      });
  }
}
