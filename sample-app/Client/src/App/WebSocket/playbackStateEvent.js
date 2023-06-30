import { useState, useContext, useEffect } from "react";
import { SocketContext } from "./socket";
import MBEResponse from "../Recoil/MBEResponse";
import { useRecoilValue} from "recoil";


export default function PlayBackStateEvent(props) {
  const eventResponse = useRecoilValue(MBEResponse);
  useEffect(() => {
    if (eventResponse.method === "playBackState") {
      props.handler(eventResponse["data"]);
    }
  }, [eventResponse]);
}
