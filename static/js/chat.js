"use strict";

/** Client-side of groupchat. */

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];
const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);

const name = prompt("Username? (no spaces)");

/** called when connection opens, sends join info to server. */

ws.onopen = function (evt) {
  console.log("open", evt);

  let data = { type: "join", name: name };
  ws.send(JSON.stringify(data));
};

/** called when msg received from server; displays it. */

ws.onmessage = function (evt) {
  console.log("evt.data", evt.data);

  let msg = JSON.parse(evt.data);
  let item;

  console.log("msg", msg);

  if (msg.type === "note") {
    item = $(`<li><i>${msg.text}</i></li>`);
  } else if (msg.type === "chat") {
    item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
  } else if (msg.type === "joke") {
    item = $(`<li>${msg.text}</li>`);
  } else {
    return console.error(`bad message: ${msg}`);
  }

  $("#messages").append(item);
};

/** called on error; logs it. */

ws.onerror = function (evt) {
  console.error(`err ${evt}`);
};

/** called on connection-closed; logs it. */

ws.onclose = function (evt) {
  console.log("close", evt);
};

/** Handles form inputs */
function formatData(msg) {
  let data = {
    type: "chat",
    text: msg,
  };

  if (msg === "/joke") {
    data.type = "joke";
    data.text = "this is a joke";
  }

  return data;
}

/** send message when button pushed. */

$("form").submit(function (evt) {
  evt.preventDefault();
  let chatInput = $("#m").val();
  let data = formatData(chatInput);

  ws.send(JSON.stringify(data));

  $("#m").val("");
});
