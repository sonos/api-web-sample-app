import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import axios from "axios";

// Setting up the WebSocket Connection...

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
httpServer.listen(8000);

io.on("connection", (socket) => {
  console.log("Connected to client...", socket.id);

  // send a message to the client
  // socket.emit("message from server", "Now we can receive events from server");

  // receive a message from the client
  socket.on("hello from client", (data) => {
    console.log(data);
  });
});

function sendRequest(data) {
  io.emit("message from server", data);
}

// Backend Server to recieve call backs

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

app.post("/", (req, res) => {
  console.log("Post request received...");
  const headers = req.headers;
  const data = req.body;
  console.log(data);
  console.log("\n ...End of request...\n");
  sendRequest({ headers: headers, data: data });
});

app.get("/", (req, res) => {
  console.log("GET request received...");
  res.send("Hello World");
});

app.get("/getHouseholds", function(req, res, next) {
  console.log("getHouseHolds request received...");
  console.log(req);
  const options = {
    url: "https://api.ws.sonos.com/control/api/v1/households",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer NqWS5PqAJmavhPj7iCcoTEB3RAzf",
    },
  };

  axios(options)
    .then((resp) => {
      const response = resp.data;
      console.log(response);
      res.send(response);
    })
    .catch(function (error) {
      const response = "Error in fetching Households... " + error;
      console.log(response);
      res.send(response);
    });
});
