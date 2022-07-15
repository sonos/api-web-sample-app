import { METHOD_GET } from "../Utility/constants";
import Helper from "../Utility/helper";

export default function StateAtStart(props) {
  const helper = new Helper();

  let url = helper.getGroupsURL();
  let nameSpace = "/playback";

  const endPoint = url + props.deviceId + nameSpace;

  const headers = helper.getHeaderBearer();

  const data = {};

  helper
    .apiCall(endPoint, headers, METHOD_GET, data)
    .then((res) => {
      console.debug(
        props.deviceType + " State at start is : ",
        res.data.playbackState
      );
      props.getStateHandler(
        false,
        res.data.playbackState === "PLAYBACK_STATE_PLAYING"
      );
    })
    .catch(function (error) {
      helper.logError(error);
    });
}
