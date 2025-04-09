import { namespaceSockets } from "./script.js";

export const joinRoom = async (roomTitle, namespaceId) => {
  console.log(roomTitle, namespaceId);
  namespaceSockets[namespaceId].emit("joinRoom", roomTitle);
};
