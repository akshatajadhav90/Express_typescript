import { AppDataSource } from "../config/database";
import { Product } from "../entities/product";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";
// Get the TypeORM repository
const productRepository = AppDataSource.getRepository(Product);

// Fetch all products
export const getAllProducts = async () => {
  try {
    const data =  await productRepository.find(); // TypeORM Query
    return successResponse(STATUS_CODES.SUCCESS, MESSAGES.PRODUCT.FETCH_SUCCESS, data);
  } catch (error:any) {
    console.error("Error creating product:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER, error.message);
  }
};

// Create a new product
export const createProduct = async (name: string) => {
  try {
    const newProduct = productRepository.create({ name });
    const savedProduct = await productRepository.save(newProduct);

    return successResponse(STATUS_CODES.CREATED, MESSAGES.PRODUCT.CREATED_SUCCESS, savedProduct);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER, error.message);
  }
};
