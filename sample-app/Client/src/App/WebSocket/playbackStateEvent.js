import { useState, useContext, useEffect } from "react";
import { SocketContext } from "./socket";
import ProcessRequest from "../Eventing/processEvents";

export default function PlayBackStateEvent(props) {
  const socket = useContext(SocketContext);
  const [MBEResponse, SetMBEResponse] = useState(false);

  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events via websocket connection established
      socket.on("message from server", (data) => { console.log(data.headers["x-sonos-type"])
        if (data.headers !== undefined) {
          const processRequest = new ProcessRequest();
          const res = processRequest.loadRequest(data);
          SetMBEResponse(res);
        }
      });
    }
  });

  const eventResponse = JSON.parse(MBEResponse);
  if (eventResponse.method === "playBackState"){
      props.handler(eventResponse["data"]);
  }
}
