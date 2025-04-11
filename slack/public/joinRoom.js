import { buildMessageHtml } from "./buildMessageHTML.js";
import { namespaceSockets } from "./script.js";

export const joinRoom = async (roomTitle, namespaceId) => {
  const ackResp = await namespaceSockets[namespaceId].emitWithAck("joinRoom", {
    roomTitle,
    namespaceId,
  });

  document.querySelector(
    ".curr-room-num-users"
  ).innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`;
  document.querySelector(".curr-room-text").innerHTML = roomTitle;

  document.querySelector("#messages").innerHTML = "";
  ackResp.thisRoomHistory.forEach(
    (message) =>
      (document.querySelector("#messages").innerHTML =
        buildMessageHtml(message))
  );
};
