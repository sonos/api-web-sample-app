import { useEffect } from "react";
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
