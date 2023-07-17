import Helper from "../Utility/helper";
import { useEffect, useState } from "react";


export default function GroupsSubscribe(props) {
  const [error, setError] = useState([]);
  const helper = new Helper();

  useEffect(() => {
    let mounted = true;

    let endPointGS =
      helper.getHouseHoldURL() + props.householdID + "/groups/subscription";

    const headers = helper.getHeaderBearer();

    const data = {};

    helper
      .apiCall(endPointGS, headers, "POST", data)
      .then((res) => {
        console.debug(endPointGS, res.data);
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
