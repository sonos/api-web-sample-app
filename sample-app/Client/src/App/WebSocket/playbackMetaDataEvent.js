import { useEffect } from "react";
import MBEResponse from "../Recoil/MBEResponse";
import { useRecoilValue} from "recoil";

export default function PlayBackMetaDataEvent(props) {
  const eventResponse = useRecoilValue(MBEResponse);
  useEffect(() => {
    if (eventResponse.method === "playBackMetaData") {
      props.handler(eventResponse["data"]);
    }
  }, [eventResponse]);
}
