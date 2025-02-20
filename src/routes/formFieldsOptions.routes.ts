import { Router } from "express";
import { FormFieldsOptionsController } from "../controllers/formFieldsOptions.controller";

const router = Router();
const formFieldsOptionsController = new FormFieldsOptionsController();

router.get("/:formFieldsOptionId", (req, res) => formFieldsOptionsController.getFormFieldsOptionsByFormFieldId(req, res));
router.post("/create", (req, res) => formFieldsOptionsController.createFormFieldOption(req, res));

export default router;