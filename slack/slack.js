import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");
  socket.emit("welcome", "welcome to the server");
  //   socket.on("newMessageToServer", (dataFromClient) => {
  //     console.log("Data:", dataFromClient);
  //     // io.of("/").emit("newMessageToClients", { text: dataFromClient.text });
  //     io.emit("newMessageToClients", { text: dataFromClient.text });
  //   });
});
