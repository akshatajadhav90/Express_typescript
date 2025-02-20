import { Request, Response } from "express";
import { FormFieldService } from "../services/formField.service";
import { MESSAGES } from "../constants/messages";

export class FormFieldController {
  private formFieldService: FormFieldService;

  constructor() {
    this.formFieldService = new FormFieldService();
  }

  async getFormFields(req: Request, res: Response): Promise<void> {
    try {
      const formFields = await this.formFieldService.getAllFormFields();
      res.status(200).json(formFields);
    } catch (error) {
      console.error("Error in FormFieldController (getFormFields):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  async createFormField(req: Request, res: Response): Promise<any> {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
    }

    const { name, subFormId, field_type, type, is_required, is_editable, is_sort, order, colspan, rowspan } = req.body;

    if (!name || !subFormId || !field_type || !type) {
      return res.status(400).json({ error: MESSAGES.MISSING_FIELDS });
    }

    try {
      const newFormField = await this.formFieldService.createFormField(
        name, subFormId, field_type, type, is_required, is_editable, is_sort, order, colspan, rowspan
      );
      res.status(201).json(newFormField);
    } catch (error) {
      console.error("Error in FormFieldController (createFormField):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  async getFormFieldById(req: Request, res: Response): Promise<any> {
    const id  = req.params.formfieldId;
    
  
    if (!id) {
      return res.status(400).json({ error: MESSAGES.MISSING_FIELDS });
    }
  
    try {
      const formField = await this.formFieldService.getFormFieldById(parseInt(id));
  
      if (!formField) {
        return res.status(404).json({ error: MESSAGES.NOT_FOUND });
      }
  
      res.status(200).json(formField);
    } catch (error) {
      console.error("Error in FormFieldController (getFormFieldById):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }
  
}
