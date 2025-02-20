import { Request, Response } from "express";
import { FormService } from "../services/form.service";
import { MESSAGES } from "../constants/messages";

export class FormController {
  private formService: FormService;

  constructor() {
    this.formService = new FormService();
  }


  async getForms(req: Request, res: Response): Promise<void> {
    try {
      const forms = await this.formService.getAllForms();
      res.status(200).json(forms);
    } catch (error) {
      console.error("Error in FormController (getForms):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  async createForm(req: Request, res: Response): Promise<any> {
     
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
    }

    const { formName, productGateMapId } = req.body;

    if (!formName || !productGateMapId) {
      return res.status(400).json({ error: MESSAGES.MISSING_FIELDS });
    }

    try {
      const newForm = await this.formService.createForm(formName, productGateMapId);
      res.status(201).json(newForm);
    } catch (error) {
      console.error("Error in FormController (createForm):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  async getFormById(req: Request, res: Response): Promise<any> {
    const id  = req.params.formId;
  
    if (!id) {
      return res.status(400).json({ error: "Form ID is required" });
    }
  
    try {
      const form = await this.formService.getFormById(parseInt(id));
  
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
  
      res.status(200).json(form);
    } catch (error) {
      console.error("Error in FormController (getFormById):", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}
