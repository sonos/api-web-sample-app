import { io } from "socket.io-client";
import ProcessRequest from "../Eventing/processEvents";

export default function SetUpClient(props) {
  const socket = io("ws://localhost:8000");

  // send a message to the server
  socket.emit(
    "hello from client",
    "Test message from client received after setting up the connection..."
  );

  socket.on("message from server", (data) => {
    console.log(data);

    if (data.headers !== undefined){
      const processRequest = new ProcessRequest()
      const res = processRequest.loadRequest(data);
      props.receiveEventsHandler(res);
    }  
  });
}
