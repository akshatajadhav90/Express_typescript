// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { getAllGates, createGate } from "../services/gates.service";
import { MESSAGES } from "../constants/messages";

// Controller to fetch all gates
export const getGates = async (req: Request, res: Response) => {
  try {
    const gates = await getAllGates();
    res.status(200).json(gates);
  } catch (error) {
    console.error("Error in gates controller (getGates):", error);
    res.status(500).json({ error: error });
  }
};

// Controller to create a new gate
export const createGates = async (req: Request, res: Response): Promise<any> =>{
  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
  }
  const { name } = req.body;

  try {
    const newProduct = await createGate(name);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in gates controller (createGateHandler):", error);
    res.status(500).json({ error: error });
  }
};
