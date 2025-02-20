import { Request, Response } from "express";
import { FormFieldsOptionsService } from "../services/formFieldsOptions.service";
import { MESSAGES } from "../constants/messages";

export class FormFieldsOptionsController {
  private formFieldsOptionsService: FormFieldsOptionsService;

  constructor() {
    this.formFieldsOptionsService = new FormFieldsOptionsService();
  }

  // Get all options by formFieldsId
  async getFormFieldsOptionsByFormFieldId(req: Request, res: Response): Promise<any> {
    const formFieldsOptionId = req.params.formFieldsOptionId;

    if (!formFieldsOptionId) {
      return res.status(400).json({ error: MESSAGES.MISSING_FIELDS });
    }

    try {
      const formFieldsOptions = await this.formFieldsOptionsService.getFormFieldsOptionsByFormFieldId(parseInt(formFieldsOptionId));

      if (!formFieldsOptions) {
        return res.status(404).json({ error: MESSAGES.NOT_FOUND });
      }

      res.status(200).json({ success: true, message: MESSAGES.FETCH_SUCCESS, data: formFieldsOptions });
    } catch (error) {
      console.error("Error in FormFieldsOptionsController (getFormFieldsOptionsByFormFieldId):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  // Create a new form field option
  async createFormFieldOption(req: Request, res: Response): Promise<any> {
    const { name, field_type, type, is_required, is_editable, is_sort, order, colspan, rowspan, formFieldsId } = req.body;

    if (!name || !field_type || !type || !formFieldsId) {
      return res.status(400).json({ error: MESSAGES.MISSING_FIELDS });
    }

    try {
      const newOption = await this.formFieldsOptionsService.createFormFieldOption({
        name,
        field_type,
        type,
        is_required,
        is_editable,
        is_sort,
        order,
        colspan,
        rowspan,
        formFieldsId
      });

      res.status(201).json({ success: true, message: MESSAGES.CREATED_SUCCESS, data: newOption });
    } catch (error) {
      console.error("Error in FormFieldsOptionsController (createFormFieldOption):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }
}
