const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("5000", () => {
  console.log("Server Running on Port 5000...");
});

io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id);



  socket.on("send_message", (data) => {
    
   socket.emit("receive_message", data.content);
   console.log(data.content);
  });

 
});