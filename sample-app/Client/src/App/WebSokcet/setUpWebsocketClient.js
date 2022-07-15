import { io } from "socket.io-client";

export default function SetUpClient() {
  const socket = io("ws://localhost:8000");

  // send a message to the server
  socket.emit(
    "hello from client",
    "Test message from client received after setting up the connection..."
  );

  socket.on("message from server", (data) => {
    console.log(data);
  });
}
