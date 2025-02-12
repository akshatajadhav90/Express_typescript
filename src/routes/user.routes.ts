import express from "express";
const router = express.Router();
import { userController } from "../controllers/user.controller";


/* Register User */
// router.post("/register", userController.register.bind(userController));
router.post("/register", (req, res) => userController.register(req, res));

/* Login User */
// router.post("/login", userController.login.bind(userController));
router.post("/login", (req, res) => userController.login(req, res));

export default router;