// src/controllers/gates.controller.ts

import { Request, Response } from "express";
import { GatesService } from "../services/gates.service";
import { MESSAGES } from "../constants/messages";

export class GatesController {
  private gatesService: GatesService;

  constructor() {
    this.gatesService = new GatesService();
  }

  // Controller to fetch all gates
  async getGates(req: Request, res: Response):Promise<void> {
    try {
      const gates = await this.gatesService.getAllGates();
      res.status(200).json(gates);
    } catch (error) {
      console.error("Error in GatesController (getGates):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }

  // Controller to create a new gate
  async createGates(req: Request, res: Response):Promise<any> {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
    }
    const { name } = req.body;

    try {
      const newGate = await this.gatesService.createGate(name);
      res.status(201).json(newGate);
    } catch (error) {
      console.error("Error in GatesController (createGates):", error);
      res.status(500).json({ error: MESSAGES.INTERNAL_SERVER });
    }
  }
}
