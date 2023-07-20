import Helper from "../Utility/helper";
import { useEffect } from "react";


export default function GroupsSubscribe(props) {
  const helper = new Helper();

  useEffect(() => {
    let endPointGS =
      helper.getHouseHoldURL() + props.householdId + "/groups/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper.apiCall(endPointGS, headers, "POST", data)
      .catch(function (error) {
        console.error(error);
      });

    return () => {
      helper.apiCall(endPointGS, headers, "DELETE", data)
        .catch(function (error) {
          console.error(error);
        });
    };
  }, []);
}
