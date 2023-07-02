import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generarJWT from "../helpers/jwt.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya existe",
      });
    }

    const user = new User(req.body);

    // genera el hash de la constraseña en 10 rondas
    // no más ni menos porque sino se hace muy lento
    // ! sincrono
    const salt = bcrypt.genSaltSync(10);

    // bcrypt.hashSync() utiliza esa sal junto con la contraseña proporcionada para generar un hash.
    user.password = bcrypt.hashSync(password, salt); // ! sincrono

    const token = await generarJWT(user.id);

    await user.save();

    return res.send({
      user,
      token,
    });
  } catch (error) {
    // console.log(error)
    console.log(error.message);
    console.log(error.detail);
    res.status(500).send({ ok: false, message: "error del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const usuarioExist = await User.findOne({ email });

  if (!usuarioExist) {
    return res.status(404).json({
      ok: false,
      message: "Email no existe",
    });
  }

  // verifica la contraseña que nos envian y la contraseña de la base de datos
  const confirmPassword = bcrypt.compareSync(password, usuarioExist.password);

  if (!confirmPassword) {
    return res.status(404).send({ message: "password incorrecta" });
  }

  const token = generarJWT(usuarioExist.id);

  return res.send({ user: usuarioExist, token });
};

export const renewToken = async (req, res) => {
  const {uid} = req;

  const user = await User.findById(uid)

  const token = generarJWT(user.id)

  res.send({user, token});
};

// Controller to update an item by ID
export const updateOne = async (req, res) => {
  // Get the ID from the route parameter
  const { id } = req.params;

  // Get the data from the request body
  const { name, description } = req.body;

  // Logic to update an item by ID in the database
  // ...

  res.send(`Update item by ID: id`);
};

// Controller to remove an item by ID
export const removeOne = async (req, res) => {
  // Get the ID from the route parameter
  const { id } = req.params;

  // Logic to remove an item by ID from the database
  // ...

  res.send(`Remove item by ID: id`);
};
