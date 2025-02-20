import { FormFieldRepository } from "../repositories/formField.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class FormFieldService {
  private formFieldRepository: FormFieldRepository;

  constructor() {
    this.formFieldRepository = new FormFieldRepository();
  }

  async getAllFormFields() {
    try {
      const data = await this.formFieldRepository.findAll();
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error fetching form fields:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  async createFormField(
    name: string,
    subFormId: number,
    field_type: string,
    type: string,
    is_required: number,
    is_editable: number,
    is_sort: number,
    order: number,
    colspan: number,
    rowspan: number
  ) {
    try {
      const savedFormField = await this.formFieldRepository.createFormField(
        name, subFormId, field_type, type, is_required, is_editable, is_sort, order, colspan, rowspan
      );
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedFormField);
    } catch (error: any) {
      console.error("Error creating form field:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  async getFormFieldById(id: number) {
    try {
      const data = await this.formFieldRepository.findById(id);
      
      if (!data) {
        return errorResponse(STATUS_CODES.NOT_FOUND, MESSAGES.NOT_FOUND);
      }
  
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error fetching form field by ID:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }
  
}
