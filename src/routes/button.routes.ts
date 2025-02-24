// src/routes/product.routes.ts
import express from "express";
import { buttonController } from "../controllers/button.controller";

const router = express.Router();

router.post("/create", (req, res) => buttonController.createButton(req, res));

export default router;
