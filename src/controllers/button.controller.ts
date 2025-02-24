import { Request, Response } from "express";
import { MESSAGES } from "../constants/messages";
import { ButtonService } from "../services/button.service";

export class ButtonController {
  private buttonService: ButtonService;

  constructor(buttonService?: ButtonService) {
    this.buttonService = buttonService || new ButtonService();
  }

  public async createButton(req: Request, res: Response): Promise<void> {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
      return;
    }

    try {
      const newButton = await this.buttonService.createButton(req.body);
      res.status(201).json(newButton);
      
    } catch (error) {
      console.error("Error in buttonController (createButton):", error);
      res.status(500).json({ error: error });
    }
  }
}

export const buttonController = new ButtonController();
