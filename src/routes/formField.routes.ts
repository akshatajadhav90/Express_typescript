import express from "express";
import { FormFieldController } from "../controllers/formfield.controller";

const router = express.Router();
const formFieldController = new FormFieldController;

router.get("/", (req, res) => formFieldController.getFormFields(req, res));
router.post("/create", (req, res) => formFieldController.createFormField(req, res));
router.get("/:formfieldId", (req, res) => formFieldController.getFormFieldById(req, res));

export default router;