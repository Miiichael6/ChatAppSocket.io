import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';
import Sockets from "./sockets.js";
import mongoDatabase from "../database/db.js";
import router from "../router/main.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    mongoDatabase()
    this.server = http.createServer(this.app);
    // this.dotenv = dotenv;
    this.io = new SocketServer(this.server, {});
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use("/api",router)
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // init middls
    this.middlewares()

    // init sockets
    this.configSockets();

    // init server
    this.server.listen(this.port);
    console.log(`Server on port http://localhost:${this.port}`);
  }
}
