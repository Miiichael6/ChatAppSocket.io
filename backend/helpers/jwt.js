import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generarJWT = (uid) => {
  const { JWT_KEY } = process.env;
  const payload = { uid };

  return jwt.sign(payload, JWT_KEY, { expiresIn: "24h" });
};

export const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid]
  } catch (error) {
    return [false ,null]
  }
};

export default generarJWT;
