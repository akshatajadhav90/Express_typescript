import { Router } from "express";
import { registerController, loginController } from "../controllers/user.controller";
const router = Router();

/* Register User */
router.post("/register", registerController);

/* Login User */
router.post("/login", loginController);

export default router;