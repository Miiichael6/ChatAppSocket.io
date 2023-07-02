import Server from "./models/server.js";
import dotenv from "dotenv"
dotenv.config();

const server = new Server();

server.execute()



































// import express from 'express';
// import http from 'http';
// import path from 'path';
// import {Server as SocketServer} from 'socket.io';
// import { fileURLToPath } from 'url';

// // para configurar el __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const server = http.createServer(app);
// const io = new SocketServer(server);

// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//   // console.log(socket.id)

//   // ? Emite
//   // socket.emit("mensaje", {
//   //   msg: "Hola desde el Servidor",
//   //   date: new Date()
//   // })

//   // ? Escucha
//   // socket.on("client:mensaje", (data) => {
//   //   console.log(data)
//   // })

//   socket.on("mensaje-al-servidor", (data) => {

//     io.emit("mensaje-from-server", data)
//   })
// });


// const PORT = 4000;
// server.listen(PORT)
// console.log(`Servidor escuchando en el puerto localhost:${PORT}`);

