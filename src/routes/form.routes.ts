import express from "express";
import { FormController } from "../controllers/form.controller";

const router = express.Router();
const formController = new FormController();

router.get("/", (req, res) => formController.getForms(req, res));
router.post("/create", (req, res) => formController.createForm(req, res));

export default router;
