import Helper from "../Utility/helper";
import { useEffect } from "react";

/**
 * Functional component that subscribes to a player's volume change events
 * Unsubscribes on unmounting of component
 * @param props.playerId {string} Used to target specific player in Sonos API calls
 */
export default function PlayerVolumeSubscribe(props) {
  // Used to make API calls
  const helper = new Helper();

  useEffect(() => {
    // Player subscription URL
    const endPoint = helper.getPlayersURL() + props.playerId + "/playerVolume/subscription";

    // Contains access token and API response format specifier
    const headers = helper.getHeaderBearer();

    // Data sent to Sonos API (no data needed for subscriptions)
    const data = {};

    // Calls Sonos API to subscribe to player volume events for specified player
    helper.apiCall(endPoint, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    // When component is unmounted, it unsubscribes player volume events for the specified player
    return () => {
      helper.apiCall(endPoint, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);
}
