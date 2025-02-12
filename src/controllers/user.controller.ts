import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { MESSAGES } from "../constants/messages";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /* Register User */
  async register(req: Request, res: Response): Promise<void> {
    try {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ status: "error", message: MESSAGES.REQUEST_BODY_REQUIRED });
        return;
      }

      const newUser = await this.userService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      console.error("Error in UserController (register):", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  /* Login User */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ status: "error", message: MESSAGES.REQUEST_BODY_REQUIRED });
        return;
      }

      const result = await this.userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in UserController (login):", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export const userController = new UserController();
