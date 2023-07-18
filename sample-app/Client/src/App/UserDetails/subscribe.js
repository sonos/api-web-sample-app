/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect, useState } from "react";


export default function Subscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    const groupID = props.groupID;

    let endPointPB = helper.getGroupsURL() + groupID + "/playback/subscription";

    let endPointGV =
      helper.getGroupsURL() + groupID + "/groupVolume/subscription";

    let endPointMD =
      helper.getGroupsURL() + groupID + "/playbackMetadata/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPointPB, headers, "POST", data);

    helper.apiCall(endPointGV, headers, "POST", data);

    helper.apiCall(endPointMD, headers, "POST", data)

    return () => {
      helper.apiCall(endPointPB, headers, "DELETE", data);

      helper.apiCall(endPointGV, headers, "DELETE", data);

      helper.apiCall(endPointMD, headers, "DELETE", data);
    };
  }, []);
}
