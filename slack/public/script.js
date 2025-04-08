const socket = io("http://localhost:8001");

socket.on("connect", () => {
  console.log("connected");
  socket.emit("clientConnect");
});

socket.on("welcome", (data) => console.log(data));
