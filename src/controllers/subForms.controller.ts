// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { SubFormService } from "../services/subForms.service";
import { MESSAGES } from "../constants/messages";

export class SubFormController {
  private subFormService: SubFormService;

  constructor() {
    this.subFormService = new SubFormService();
  }

  // Controller to fetch all products
  public async getSubForm(req: Request, res: Response): Promise<void> {
    try {
      const subForm = await this.subFormService.getSubForm();
      res.status(200).json(subForm);
    } catch (error) {
      console.error("Error in SubFormController (getSubForm):", error);
      res.status(500).json({ error: error });
    }
  }

  // Controller to create a new product
  public async createSubForm(req: Request, res: Response): Promise<void> {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
      return;
    }

    const { label, formId, type, category, order } = req.body;

    try {
      const newSubForm = await this.subFormService.createSubForm(label, formId, type, category, order);
      res.status(201).json(newSubForm);
    } catch (error) {
      console.error("Error in SubFormController (createSubForm):", error);
      res.status(500).json({ error: error });
    }
  }
}

export const subFormController = new SubFormController();
