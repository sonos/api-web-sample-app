import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function PlayerVolumeSubscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    const playerID = props.playerID;

    const endPoint = helper.getPlayersURL() + playerID + "/playerVolume/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPoint, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    return () => {
      helper.apiCall(endPoint, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);
}
