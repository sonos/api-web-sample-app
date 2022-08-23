/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect, useState } from "react";


export default function Subscribe(props) {
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {
    let mounted = true;

    var groupID = props.groupID;

    let endPointPB = helper.getGroupsURL() + groupID + "/playback/subscription";

    let endPointGV =
      helper.getGroupsURL() + groupID + "/groupVolume/subscription";

    let endPointMD =
      helper.getGroupsURL() + groupID + "/playbackMetadata/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper
      .apiCall(endPointPB, headers, "POST", data)
      .then((res) => {
        console.debug(endPointPB, res.data);
        if (mounted) {
          setError(false);
        }
      })
      .catch(function () {
        setError(true);
        return Promise.reject(error);
      });

    helper
      .apiCall(endPointGV, headers, "POST", data)
      .then((res) => {
        if (mounted) {
          setError(false);
        }
      })
      .catch(function (error) {
        setError(true);
        return Promise.reject(error);
      });

    helper
      .apiCall(endPointMD, headers, "POST", data)
      .then((res) => {
        if (mounted) {
          setError(false);
        }
      })
      .catch(function (error) {
        setError(true);
        return Promise.reject(error);
      });

    return () => (mounted = false);
  }, []);
}
