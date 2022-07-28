import  { useContext, useEffect } from "react";
import { SocketContext } from "../WebSokcet/socket";
import ProcessRequest from "../Eventing/processEvents";

export default function SetUpClient(props) {

  const socket = useContext(SocketContext);
  console.debug("Socket is: ",socket);

  useEffect(() => {

    // send a message to the server
    socket.emit("hello from client", "Test message from client received...");

    // subscribe to socket events
    socket.on("message from server", (data) => {
      console.debug(data);

      if (data.headers !== undefined) {
        const processRequest = new ProcessRequest();
        const res = processRequest.loadRequest(data);
        props.receiveEventsHandler(res);
      }
    });

  });

}
