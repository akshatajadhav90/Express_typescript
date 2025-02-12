import { AppDataSource } from "../config/database";
import { User } from "../entities/user.entity";
import bcrypt from "bcryptjs";
import { MESSAGES } from "../constants/messages";
import { STATUS_CODES } from "../constants/statusCodes";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { validatePassword, generateToken } from "../middlewares/auth";

const userRepository = AppDataSource.getRepository(User);

/* Register User */
export const registerUser = async (userData: Partial<User>) => {
  try {
    const existingUser = await userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      return errorResponse(STATUS_CODES.BAD_REQUEST, MESSAGES.AUTH.USER_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    userData.password = hashedPassword;
    
    const newUser = await userRepository.create(userData);
    const savedUser = await userRepository.save(newUser).catch((error) => {
      console.error("Error saving user:", error);
      throw error;
    });
    const token = generateToken(savedUser);
    const data = {
      id: savedUser.id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber,
      token
    };

    
    return successResponse(STATUS_CODES.CREATED, MESSAGES.AUTH.REGISTER_SUCCESS, data);
  } catch (error) {
    console.error("Error in registerUser:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER);
  }
};

/* Login User */
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return errorResponse(STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(STATUS_CODES.UNAUTHORIZED, MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const token = generateToken(user);
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token
    };

    return successResponse(STATUS_CODES.SUCCESS, MESSAGES.AUTH.LOGIN_SUCCESS, data);
  } catch (error) {
    console.error("Error in loginUser:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER);
  }
};