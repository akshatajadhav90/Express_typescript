// src/services/product.service.ts

import { findAllGates, createNewGate } from "../repositories/gates.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

// Fetch all products
export const getAllGates = async () => {
  try {
    const data = await findAllGates();
    return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
  }
};

// Create a new product
export const createGate = async (name: string) => {
  try {
    const savedProduct = await createNewGate(name);
    return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedProduct);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
  }
};
