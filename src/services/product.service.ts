// src/services/product.service.ts

import { findAllProducts, createNewProduct } from "../repositories/product.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const data = await findAllProducts();
    return successResponse(STATUS_CODES.SUCCESS, MESSAGES.PRODUCT.FETCH_SUCCESS, data);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER, error.message);
  }
};

// Create a new product
export const createProduct = async (name: string) => {
  try {
    const savedProduct = await createNewProduct(name);
    return successResponse(STATUS_CODES.CREATED, MESSAGES.PRODUCT.CREATED_SUCCESS, savedProduct);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER, error.message);
  }
};
