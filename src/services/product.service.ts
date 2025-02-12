// src/services/product.service.ts
import { ProductRepository } from "../repositories/product.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  // Fetch all products
  public async getAllProducts() {
    try {
      const data = await this.productRepository.findAllProducts();
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error in ProductService (getAllProducts):", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  // Create a new product
  public async createProduct(name: string) {
    try {
      const savedProduct = await this.productRepository.createNewProduct(name);
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedProduct);
    } catch (error: any) {
      console.error("Error in ProductService (createProduct):", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }
}
