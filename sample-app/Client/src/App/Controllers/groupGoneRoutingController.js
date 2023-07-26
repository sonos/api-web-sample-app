import React, {useEffect} from "react";

/**
 * Navigates back to previous page. Intended use is when the currently displayed group disappears (GROUP_STATUS_GONE event)
 * This functional component is necessary, as useEffect cannot be called within a class component
 * @param props.navigate The result of calling the useNavigate() hook in groupPlayersComponentWrapper
 */
export default function GroupGoneRoutingController(props) {
  useEffect(() => {
    props.navigate(-1);
  }, []);
}
