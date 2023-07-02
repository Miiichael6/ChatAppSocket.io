import { Router } from "express";
import authRoute from "./auth.router.js";
import messagesRoute from "./messages.router.js";

const router = Router();

router.use("/auth", authRoute)
router.use("/messages", messagesRoute)

export default router;