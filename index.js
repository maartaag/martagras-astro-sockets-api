import express from "express";
import { createServer, get } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

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
    io.emit("chat:connected", getSpecificPerson(socket.id));
  });

  socket.on("disconnect", (algo) => {
    console.log("user disconnected en " + getSpecificPerson(socket.id));
    userDisconnect(socket);
    io.emit("chat:disconnected", getSpecificPerson(socket.id));
  });

  socket.on("chat:message", (aquitengoalgodistintoastr) => {
    io.emit("chat:message", aquitengoalgodistintoastr);
  });
  socket.on("users:list", () => {
    io.to(socket.id).emit("users:list", Object.values(listaPersonas));
  });
  socket.on("chat:typing", (algo) => {
    socket.broadcast.emit("chat:typing", getSpecificPerson(socket.id));
  });
});
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

function getSpecificPerson(socketId) {
  return listaPersonas[socketId];
}
function addUser(socket, algo) {
  listaPersonas[socket.id] = algo + "-" + new Date().toLocaleDateString();
  usersConectados[socket.id] = socket;
}
function userDisconnect(socket) {
  delete usersConectados[socket.id];
}
