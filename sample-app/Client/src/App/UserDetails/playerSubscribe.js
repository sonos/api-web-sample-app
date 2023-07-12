/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
import Helper from "../Utility/helper";
import { useEffect, useState } from "react";


export default function PlayerSubscribe(props) {
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {
    let mounted = true;

    var playerID = props.playerID;

    let endPoint = helper.getPlayersURL() + playerID + "/playerVolume/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper
      .apiCall(endPoint, headers, "POST", data)
      .then((res) => {
        console.debug(endPoint, res.data);
        if (mounted) {
          setError(false);
        }
      })
      .catch(function () {
        setError(true);
        return Promise.reject(error);
      });

    return () => (mounted = false);
  }, []);
}
