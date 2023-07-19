import {GroupVolumeApiFactory} from "../museClient/api";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import volumeAtom from "../Recoil/volumeAtom";
import {useRecoilState} from "recoil";

export default function GetGroupVolume(props) {
  const [volumeState, setVolumeState] = useRecoilState(volumeAtom);
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
