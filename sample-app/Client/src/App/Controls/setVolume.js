import config from "../../config.json";
import Helper from "../Utility/helper";
import { METHOD_POST } from "../Utility/constants";

import { logMessage, logError } from "../Utility/customLogger";

export default function SetVolume(volume, deviceId, deviceType) {
  
  const helper = new Helper();
  
  let url =
    deviceType === "GROUP" 
        ? helper.getGroupsURL()
        : config.api_end_points.volume_api_end_point;
  let nameSpace = deviceType === "GROUP" ? "/groupVolume" : "/playerVolume";

  const endPoint = url + deviceId + nameSpace;
    
  const headers = helper.getHeaderBearer()

  const data = { volume: volume };

  helper.apiCall(endPoint, headers, METHOD_POST, data)
  .then((res) => {
    logMessage("response from the api : " + JSON.stringify(res.data));
  })
  .catch(function (error) {
    logError("Error caught in set volume api : " + error);
  });

}
