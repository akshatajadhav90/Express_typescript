import express from "express";
import { getGates, createGates } from "../controllers/gates.controller";

const router = express.Router();

// Route to get all gates
router.get("/", getGates);

// Route to create a new gate
router.post("/create", createGates);

export default router; 
