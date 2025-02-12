import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/database";
import { STATUS_CODES } from "../constants/statusCodes";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "kbl";

/* Verify JWT Token */
export const isValidToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET) as { id: number };
    if (!decodedUser.id) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid token payload" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decodedUser.id } });

    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "User not found. Unauthorized access." });
    }

    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid access token" });
  }
};

/* Validate Password */
export const validatePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/* Generate JWT Token */
export const generateToken = (user: User): string => {
  return jwt.sign({ 
    id: user.id,
    email: user.email,
 }, JWT_SECRET, { expiresIn: "1d" });
};