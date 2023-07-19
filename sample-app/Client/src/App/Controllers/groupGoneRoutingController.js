import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function GroupGoneRoutingController(props) {
  useEffect(() => {
    props.navigate(-1);
  }, []);
}
