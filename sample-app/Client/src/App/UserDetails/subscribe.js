/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect, useState } from "react";
import { PlaybackApi, GroupVolumeApi, PlaybackMetadataApi } from "../museClient/api";

export default function Subscribe(props) {
  
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {
    let mounted = true;

    var groups = JSON.parse(window.localStorage.getItem("groups"))[0];

    for (let x in groups) {
      if (x === "id") {
        
        let endPointPB =
          helper.getGroupsURL() + groups[x] + "/playback/subscription";

        let endPointGV =
          helper.getGroupsURL() + groups[x] + "/groupVolume/subscription";

        let endPointMD =
          helper.getGroupsURL() + groups[x] + "/playbackMetadata/subscription";

        console.debug("Subscribe being called...");

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
            console.error("Something went wrong");
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
            console.error("Something went wrong");
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
            console.error("Something went wrong");
            setError(true);
            return Promise.reject(error);
          });
      }
    }

    return () => (mounted = false);
  }, []);
  props.subscribe_handler(true);
}
