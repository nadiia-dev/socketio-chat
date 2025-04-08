// const userName = prompt("What is your username?");
// const password = prompt("What is your password?");

const userName = "nadiia";
const password = "password";

const socket = io("http://localhost:8001");

socket.on("connect", () => {
  console.log("connected");
  socket.emit("clientConnect");
});

// listen namespaces
socket.on("nsList", (data) => {
  console.log(data);
  const nameSapcesDiv = document.querySelector(".namespaces");
  nameSapcesDiv.innerHTML = "";
  data.forEach((ns) => {
    nameSapcesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
  });
});
