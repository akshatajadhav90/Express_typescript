// src/routes/gates.routes.ts
import express from "express";
import { GatesController } from "../controllers/gates.controller";

const router = express.Router();
const gatesController = new GatesController();

// Define routes and bind controller methods
router.get("/", (req, res) => gatesController.getGates(req, res));
router.post("/create", (req, res) => gatesController.createGates(req, res));

export default router;
