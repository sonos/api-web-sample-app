import Helper from "../Utility/helper";
import { useEffect } from "react";

/**
 * Functional component that subscribes to current group's playback, volume, and playback metadata events
 * Unsubscribes on unmounting of component
 * @param props.groupId {string} Used to target current group in Sonos API calls
 */
export default function Subscribe(props) {
  // Used to make API calls
  const helper = new Helper();

  useEffect(() => {
    // Playback subscription URL
    const endPointPB = helper.getGroupsURL() + props.groupId + "/playback/subscription";

    // Group volume subscription URL
    const endPointGV = helper.getGroupsURL() + props.groupId + "/groupVolume/subscription";

    // Playback metadata subscription URL
    const endPointMD = helper.getGroupsURL() + props.groupId + "/playbackMetadata/subscription";

    // Contains access token and API response format specifier
    const headers = helper.getHeaderBearer();

    // Data sent to Sonos API (no data needed for subscriptions)
    const data = {};

    // Calls Sonos API to subscribe to playback events for current group
    helper.apiCall(endPointPB, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    // Calls Sonos API to subscribe to group volume events for current group
    helper.apiCall(endPointGV, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    // Calls Sonos API to subscribe to playback metadata events for current group
    helper.apiCall(endPointMD, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    // On component unmounting, it unsubscribes to all three types of events
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
