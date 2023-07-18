import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function PlayerSubscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    const playerID = props.playerID;

    let endPoint = helper.getPlayersURL() + playerID + "/playerVolume/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPoint, headers, "POST", data);

    return () => {
      helper.apiCall(endPoint, headers, "DELETE", data);
    }
  }, []);
}
