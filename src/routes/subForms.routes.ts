// src/routes/product.routes.ts
import express from "express";
import { subFormController } from "../controllers/subForms.controller";

const router = express.Router();

router.get("/", (req, res) => subFormController.getSubForm(req, res));
router.post("/create", (req, res) => subFormController.createSubForm(req, res));

export default router;
