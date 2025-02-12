import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user.service";
import { MESSAGES } from "../constants/messages";

/* Register Controller */
export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ status: "error", message: MESSAGES.REQUEST_BODY_REQUIRED });
    }

    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error in auth controller (registerController):", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

/* Login Controller */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ status: "error", message: MESSAGES.REQUEST_BODY_REQUIRED });
    }

    const result = await loginUser(email, password);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};