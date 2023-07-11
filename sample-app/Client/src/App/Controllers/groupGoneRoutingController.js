import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function GroupGoneRoutingController(props) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  });
}
