import express from "express";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { namespaces } from "./data/namespaces.js";
import { Room } from "./classes/room.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);

const io = new Server(expressServer);

// changing namespace
app.get("/change-ns", (req, res) => {
  namespaces[0].addRoom(new Room(0, "Deleted articles", 0));
  io.of(namespaces[0].endpoint).emit("nsChange", namespaces[0]);
  res.json(namespaces[0]);
});

io.use((socket, next) => {
  const jwt = socket.handshake.query.jwt;
  console.log(jwt);
  if (1) {
    next();
  } else {
    console.log("Goodbye");
    socket.disconnect();
  }
});

io.on("connection", (socket) => {
  const userName = socket.handshake.query.userName;
  const jwt = socket.handshake.query.jwt;

  socket.emit("welcome", "welcome to the server");
  socket.on("clientConnect", (data) => {
    console.log(socket.id, "has connected");
    socket.emit("nsList", namespaces);
  });
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    socket.on("joinRoom", async (roomObj, ackCallBack) => {
      const thisNs = namespaces[roomObj.namespaceId];
      const thisRoomObj = thisNs.rooms.find(
        (room) => room.roomTitle === roomObj.roomTitle
      );
      const thisRoomHistory = thisRoomObj.history;

      const rooms = socket.rooms;

      let i = 0;
      rooms.forEach((room) => {
        if (i !== 0) {
          socket.leave(room);
        }
        i++;
      });

      socket.join(roomObj.roomTitle);

      const sockets = await io
        .of(namespace.endpoint)
        .in(roomObj.roomTitle)
        .fetchSockets();
      const socketCount = sockets.length;

      ackCallBack({
        numUsers: socketCount,
        thisRoomHistory,
      });
    });

    socket.on("newMessageToRoom", (messageObj) => {
      const rooms = socket.rooms;
      const currentRoom = [...rooms][1];

      io.of(namespace.endpoint)
        .in(currentRoom)
        .emit("messageToRoom", messageObj);
      const thisNs = namespaces[messageObj.selectedNsId];
      const thisRoom = thisNs.rooms.find(
        (room) => room.roomTitle === currentRoom
      );
      thisRoom.addMessage(messageObj);
    });
  });
});
