import { GroupVolumeApiFactory } from "../museClient/api";
import { PlayerVolumeApiFactory } from "../museClient/api";

export default function GetVolume(props) {

  if(props.deviceType === "GROUP"){
    
    const groupVolumeApi = new GroupVolumeApiFactory(props.configuration);

    groupVolumeApi.groupVolumeGetVolume(props.deviceId)
    .then((res) => {
      console.debug(props.deviceType + " volume at start is : ", res);
      props.getVolumeHandler(false, res.volume);
    })
    .catch(function (error) {
      console.error("Error", error);
    });
  }else{
    const playerVolumeApi = new PlayerVolumeApiFactory(props.configuration);
    playerVolumeApi.playerVolumeGetVolume(props.deviceId)
    .then((res) => {
      console.debug(props.deviceType + " volume at start is : ", res);
      props.getVolumeHandler(false, res.volume);
    })
    .catch(function (error) {
      console.error("Error", error);
    });
  }
}
