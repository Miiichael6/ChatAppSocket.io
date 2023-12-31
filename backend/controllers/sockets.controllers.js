import Message from "../models/mensaje.js";
import User from "../models/user.js";

// Controller to get all items
export const usuarioConectado = async (uid) => {
  try {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Controller to create a new item
export const usuarioDesconectado = async (uid) => {
  try {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUsuarios = async () => {
  const users = await User.find().sort("-online");

  return users;
};

export const grabarMensaje = async (payload) => {
  try {
    const data = {
      de: payload.de,
      para: payload.para,
      mensaje: payload.mensaje,
    };

    const mensaje = new Message(data);

    await mensaje.save();

    return mensaje;
  } catch (error) {
    console.log(error);
  }
};
