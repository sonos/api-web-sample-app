import config from "../../config.json";
import { METHOD_GET } from "../Utility/constants";
import Helper from "../Utility/helper";
import { GroupVolumeApiFactory } from "../museClient/api";
import { PlayerVolumeApiFactory } from "../museClient/api";

export default function GetVolume(props) {

  if(props.deviceType === "GROUP"){
    const groupVoumeApi = new GroupVolumeApiFactory(props.museClientConfig);
    groupVoumeApi.groupVolumeGetVolume(props.deviceId)
    .then((res) => {
      console.debug(props.deviceType + " volume at start is : ", res);
      props.getVolumeHandler(false, res.volume);
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });
  }else{
    const playerVoumeApi = new PlayerVolumeApiFactory(props.museClientConfig);
    playerVoumeApi.playerVolumeGetVolume(props.deviceId)
    .then((res) => {
      console.debug(props.deviceType + " volume at start is : ", res);
      props.getVolumeHandler(false, res.volume);
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });
  }
}
