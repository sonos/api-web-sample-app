import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { SocketContext } from "./socket";
import ProcessRequest from "../Eventing/processEvents";
import MBEResponse from "../Recoil/MBEResponse";

export default function MBEEvent() {
  const socket = useContext(SocketContext);
  const [MBERes, SetMBERes] = useRecoilState(MBEResponse);

  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events via websocket connection established
      socket.on("message from server", (data) => {
        if (data.headers !== undefined) {
          const processRequest = new ProcessRequest();
          const res = processRequest.loadRequest(data);
          SetMBERes(JSON.parse(res));
        }
      });
    }
  }, []);
}