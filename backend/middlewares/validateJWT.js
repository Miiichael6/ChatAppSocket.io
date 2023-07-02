import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  try {
    let token;
    const myHeader = req.headers.authorization;

    if (myHeader && myHeader.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;

        next();
      } catch (err) {
        return res.send({ msg: err.message });
      }
    }

    if (!token) {
      return res
        .status(401)
        .send({ msg: "ningun token ha sido proporcionado" });
    }
  } catch (error) {
    return res.status(401).send({
      message: "token no válido",
    });
  }
};

export default validateJWT;
