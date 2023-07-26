import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

/*
 * This file defines and initiates the server that listens for Sonos API events, along with the WebSocket connection between the server
 *    and client that allows the server to send events to the client.
 * Sonos API sends events to the ngrok URL, which the server receives at port 8080. The server then sends this request to the WebSocket at port 8000
 * The client can then receive that event in MuseEventHandler by listening to "ws://localhost:8000" (see socket.js)
 */

// Defines WebSocket connection between client and server
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Initiates WebSocket connection
httpServer.listen(8000);

// Logs messages and connections from the client
io.on("connection", (socket) => {
  console.log("Connected to client...", socket.id);
  socket.on("hello from client", (data) => {
    console.log(data);
  });
});

/**
 * Sends data from server to client through WebSocket connection
 * @param data Data received from Sonos API event
 */
function sendRequest(data) {
  io.emit("message from server", data);
}


// Defines and initiates server that listens to incoming Sonos API events
const app = express();
const PORT = 8080;
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


// If an event is received, event is logged in server console and sent to client through the WebSocket connection
app.post("/", (req, res) => {
  console.log("Post request received...");
  const headers = req.headers;
  const data = req.body;
  console.log(data);
  console.log("\n ...End of request...\n");
  sendRequest({ headers: headers, data: data });
});

// If localhost:8000 is navigated to, Hello World is displayed
app.get("/", (req, res) => {
  console.log("GET request received...");
  res.send("Hello World");
});
