// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");

import { joinNs } from "./joinNs.js";

const userName = "nadiia";
const password = "password";

export const namespaceSockets = [];
const listeners = {
  nsChange: [],
};

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    namespaceSockets[nsId].on("nsChange", (data) => {
      console.log("Namespace Changed!");
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  }
};

const socket = io("http://localhost:8001");

socket.on("connect", () => {
  console.log("connected");
  socket.emit("clientConnect");
});

// listen to nsList of namespaces
socket.on("nsList", (data) => {
  const lastNs = localStorage.getItem("lastNs");
  const nameSapcesDiv = document.querySelector(".namespaces");
  nameSapcesDiv.innerHTML = "";
  data.forEach((ns) => {
    nameSapcesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    let thisNs = namespaceSockets[ns.id];
    if (!namespaceSockets[ns.id]) {
      namespaceSockets[ns.id] = io(`http://localhost:8001${ns.endpoint}`);
    }

    addListeners(ns.id);
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        joinNs(element, data);
      });
    }
  );
  const allNamespaces = document.getElementsByClassName("namespace");
  const target = Array.from(allNamespaces).find(
    (el) => el.getAttribute("ns") === lastNs
  );

  joinNs(target, data);
});
