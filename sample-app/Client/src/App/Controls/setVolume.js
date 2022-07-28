import { logMessage, logError } from "../Utility/customLogger";
import { GroupVolumeApiFactory } from "../museClient/api";
import { PlayerVolumeApiFactory } from "../museClient/api";

export default function SetVolume(volume, deviceId, deviceType, museClientConfig) {
  
  const data = { volume: volume };
  if(deviceType === "GROUP"){
    
    const groupVolumeApi = new GroupVolumeApiFactory(museClientConfig);

    groupVolumeApi.groupVolumeSetVolume(deviceId, data)
    .then((res) => {
      logMessage("response from the api : " + JSON.stringify(res));
    })
    .catch(function (error) {
      console.error("Error", error);
    });
  }else{
    const playerVolumeApi = new PlayerVolumeApiFactory(museClientConfig);
    playerVolumeApi.playerVolumeSetVolume(deviceId, data)
    .then((res) => {
      logMessage("response from the api : " + JSON.stringify(res));
    })
    .catch(function (error) {
      console.error("Error", error);
    });
  }
}
