/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function Subscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    const groupID = props.groupID;

    const endPointPB = helper.getGroupsURL() + groupID + "/playback/subscription";

    const endPointGV = helper.getGroupsURL() + groupID + "/groupVolume/subscription";

    const endPointMD = helper.getGroupsURL() + groupID + "/playbackMetadata/subscription";

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
