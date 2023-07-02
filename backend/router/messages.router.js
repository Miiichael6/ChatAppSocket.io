import { Router } from 'express';
import validateJWT from '../middlewares/validateJWT.js';
import {obtenerChat} from "../controllers/messages.controllers.js"

const router = Router();

router.get("/:de", validateJWT , obtenerChat)

export default router;