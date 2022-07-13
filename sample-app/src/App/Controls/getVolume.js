import config from "../../config.json";
import { METHOD_GET } from "../Utility/constants";
import Helper from "../Utility/helper";


export default function GetVolume(props) {

  const helper = new Helper();

  let url =
      props.deviceType === "GROUP"
      ? helper.getGroupsURL()
      : config.api_end_points.volume_api_end_point;
  let nameSpace = props.deviceType === "GROUP" ? "/groupVolume" : "/playerVolume";
  const endPoint = url + props.deviceId + nameSpace;
  
  const headers = helper.getHeaderBearer()

  const data = {};

  helper.apiCall(endPoint, headers, METHOD_GET, data)
  .then((res) => {
    console.debug(props.deviceType + " volume at start is : ", res.data);
    props.getVolumeHandler(false, res.data.volume);
  })
  .catch(function (error) {
    helper.logError(error);
  });

}
