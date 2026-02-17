const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let scoreboard = {
  teamA: "TEAM A",
  teamB: "TEAM B",
  scoreA: 0,
  scoreB: 0
};

io.on("connection", (socket) => {
  console.log("User connected");

  // Send current scoreboard to new user
  socket.emit("updateScore", scoreboard);

  // Admin updates score
  socket.on("changeScore", (data) => {
    scoreboard = data;
    io.emit("updateScore", scoreboard);
  });
});

// server.listen(5001, () => {
//   console.log("Server running on http://localhost:5001");
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});