import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { namespaces } from "./data/namespaces.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

const io = new Server(expressServer);

io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to the server");
  socket.on("clientConnect", (data) => {
    console.log(socket.id, "has connected");
    socket.emit("nsList", namespaces);
  });
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has connected to ${namespace.endpoint}`);
  });
});
