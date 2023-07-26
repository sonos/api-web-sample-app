import Helper from "../Utility/helper";
import { useEffect } from "react";

/**
 * Functional component that subscribes to current household's groups events
 * Unsubscribes on unmounting of component
 * @param props.householdId {string} Used to target current household in Sonos API calls
 */
export default function GroupsSubscribe(props) {
  // Used to make API calls
  const helper = new Helper();

  useEffect(() => {
    // Groups subscription URL
    let endPointGS = helper.getHouseHoldURL() + props.householdId + "/groups/subscription";

    // Contains access token and API response format specifier
    const headers = helper.getHeaderBearer();

    // Data sent to Sonos API (no data needed for subscriptions)
    const data = {};

    // Calls Sonos API to subscribe to groups events for the current household
    helper.apiCall(endPointGS, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    // When component is unmounted, it unsubscribes to group events for current household
    return () => {
      helper.apiCall(endPointGS, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });
    };
  }, []);
}
