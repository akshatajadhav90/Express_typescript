import { FormRepository } from "../repositories/form.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class FormService{

    private formRepository: FormRepository;

  constructor() {
    this.formRepository = new FormRepository();
  }

  async getAllForms() {
    try {
      const data = await this.formRepository.findAll();
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error fetching forms:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  async createForm(formName: string, productGateMapId: number) {
    try {
      const savedForm = await this.formRepository.createForm(formName, productGateMapId);
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedForm);
    } catch (error: any) {
      console.error("Error creating form:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }


}