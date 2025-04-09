import { joinRoom } from "./joinRoom.js";

export function joinNs(element, nsData) {
  const nsEndpoint = element.getAttribute("ns");

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  const rooms = clickedNs.rooms;

  let roomList = document.querySelector(".room-list");
  roomList.innerHTML = "";

  rooms.forEach((room, i) => {
    roomList.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
            <span class="fa-solid fa-${
              room.privateRoom ? "lock" : "globe"
            }"></span>${room.roomTitle}
        </li>`;
  });

  const roomNodes = document.querySelectorAll(".room");
  Array.from(roomNodes).forEach((elem) =>
    elem.addEventListener("click", (e) => {
      const namespaceId = elem.getAttribute("namespaceId");
      joinRoom(e.target.innerText, namespaceId);
    })
  );

  localStorage.setItem("lastNs", nsEndpoint);
}
