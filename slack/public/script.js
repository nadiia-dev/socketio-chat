import { joinNs } from "./joinNs.js";

// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");

const userName = "nadiia";
const password = "password";

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
    io(`http://localhost:8001${ns.endpoint}`);
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
