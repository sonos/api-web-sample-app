import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function GroupsSubscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    let endPointGS =
      helper.getHouseHoldURL() + props.householdID + "/groups/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPointGS, headers, "POST", data);

    return () => {
      helper.apiCall(endPointGS, headers, "DELETE", data);
    };
  }, []);
}
