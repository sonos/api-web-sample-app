import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

// Setting up the WebSocket Connection...

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});
httpServer.listen(8000);

io.on("connection", (socket) => {

  console.log("Connected to client...", socket.id);

  // send a message to the client
  io.emit("message from server", "Now we can receive events from server");

  // receive a message from the client
  socket.on("hello from client", (data) => {
    console.log(data);
  });
});

function sendRequest(data){
  io.emit("message from server",data);
}

// Backend Server to recieve call backs

const app = express();
const PORT = 8080;
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
  app.use(express.json());
  
  app.post('/', (req, res) => {
      console.log("Post request received...");
      const headers = req.headers;
      const data = req.body;
      console.log(data);
      console.log("\n ...End of request...\n");
      sendRequest({"headers" : headers, "data" : data});
  });

  app.get('/', (req, res) => {
      console.log("GET request received...")
    res.send("Hello World");
  });