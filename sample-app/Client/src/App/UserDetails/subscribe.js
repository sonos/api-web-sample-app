/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function Subscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    const groupId = props.groupId;

    const endPointPB = helper.getGroupsURL() + groupId + "/playback/subscription";

    const endPointGV = helper.getGroupsURL() + groupId + "/groupVolume/subscription";

    const endPointMD = helper.getGroupsURL() + groupId + "/playbackMetadata/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};
    helper.apiCall(endPointPB, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    helper.apiCall(endPointGV, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    helper.apiCall(endPointMD, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    return () => {
      helper.apiCall(endPointPB, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });

      helper.apiCall(endPointGV, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });

      helper.apiCall(endPointMD, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });
    };
  }, []);
}
