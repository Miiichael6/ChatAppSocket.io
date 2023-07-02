import {
  getUsuarios,
  grabarMensaje,
  usuarioConectado,
  usuarioDesconectado,
} from "../controllers/sockets.controllers.js";
import { comprobarJWT } from "../helpers/jwt.js";

export default class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      // ! para ver las queries
      const [valido, uid] = comprobarJWT(socket.handshake.query.Bearer_token);

      if (!valido) {
        console.log("socket no identificado");
        socket.disconnect();
        return;
      }

      console.log("cliente conectado   ", uid);

      await usuarioConectado(uid);

      // todo: unir al usuario a una sala de socket.io
      // nombre de la sala
      socket.join(uid);

      this.io.emit("lista-de-usuarios", await getUsuarios());

      // todo: unirme a una sala Socket join

      // todo: Escuchar cuando el cliente manda un mensaje
      socket.on("mensaje-personal", async (payload) => {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit("mensaje-personal", mensaje);
        this.io.to(payload.de).emit("mensaje-personal", mensaje);
      });

      // todo emitir todo los users conectados

      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
        this.io.emit("lista-de-usuarios", await getUsuarios());
        console.log("cliente desconectado", uid);
      });
    });
  }
}
