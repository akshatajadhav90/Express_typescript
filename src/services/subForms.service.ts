// src/services/product.service.ts
import { SubFormRepository } from "../repositories/subForms.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class SubFormService {
  private subFormRepository: SubFormRepository;

  constructor() {
    this.subFormRepository = new SubFormRepository();
  }

  // Fetch all products
  public async getSubForm() {
    try {
      const data = await this.subFormRepository.findAllSubForm();
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error in ProductService (getAllProducts):", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  // Create a new product
  public async createSubForm(label: string, formId: number, type: string, category: string, order: number) {
    try {
      const savedSubForm = await this.subFormRepository.createSubForm(label, formId, type, category, order);
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedSubForm);
    } catch (error: any) {
      console.error("Error in ProductService (createProduct):", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }
}
