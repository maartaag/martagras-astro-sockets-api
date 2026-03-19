import express from "express";
import { createServer, get } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { send } from "node:process";

const app = express();
const server = createServer(app);
const listaPersonas = {};
const usersConectados = {};
const io = new Server(server, {
  cors: {
    origin: "*", // on tens Astro
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });
io.on("connection", (socket) => {
  socket.on("connected", (algo) => {
    console.log("a user connected, " + algo);
    addUser(socket, algo);
    sendUsersConnectedList();
    io.emit("chat:connected", getSpecificPerson(socket.id));
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected, " + socket.id);
    let nom = getSpecificPerson(socket.id);
    if (nom === undefined) {
      console.log("user disconnected en undefined");
    } else {
      io.emit("chat:disconnected", nom);
      console.log("user disconnected en " + nom);
    }

    userDisconnect(socket);
    sendUsersConnectedList();
  });

  socket.on("chat:message", (aquitengoalgodistintoastr) => {
    console.log(
      "message: " +
        aquitengoalgodistintoastr.mensaje +
        " de " +
        aquitengoalgodistintoastr.nombre,
    );
    io.emit("chat:message", aquitengoalgodistintoastr);
  });
  socket.on("users:list", () => {
    sendUsersConnectedList(socket);
  });
  socket.on("chat:typing", (nom) => {
    socket.broadcast.emit("chat:typing", nom);
  });
  socket.on("chat:stopTyping", (nom) => {
    socket.broadcast.emit("chat:stopTyping", nom);
  });
});
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

function getSpecificPerson(socketId) {
  console.log(usersConectados[socketId]);
  return usersConectados[socketId];
}
function addUser(socket, algo) {
  listaPersonas[socket.id] = algo + "-" + new Date().toLocaleDateString();
  usersConectados[socket.id] = algo;
}
function userDisconnect(socket) {
  listaPersonas[socket.id] +=
    " - Desconectado el " + new Date().toLocaleDateString();
  delete usersConectados[socket.id];
}
function sendUsersConnectedList() {
  io.emit("users:list", Object.values(usersConectados));
}
