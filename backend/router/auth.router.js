import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  login,
  renewToken,
} from "../controllers/auth.controllers.js";
import validateFields from "../middlewares/validate-fields.js";
import validateJWT from "../middlewares/validateJWT.js"

const router = Router();

// si tenemos una funcion en el medio es un middleware
router.post(
  "/login",
  [
    check("email", "email es obligatorio").isEmail(),
    check("password", "password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/login/new",
  [
    check("nombre", "nombre es requerido").isString(),
    check("password", "password es requerido").isString().not().isEmpty(),
    check("email", "email es requerido").isEmail(),
    validateFields,
  ],
  crearUsuario
);

router.get("/login/renew",[validateJWT], renewToken);
// router.post("/", () => {});

export default router;
