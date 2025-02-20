import { FormFieldsOptionsRepository } from "../repositories/formFieldsOptions.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class FormFieldsOptionsService {
  private formFieldsOptionsRepository: FormFieldsOptionsRepository;

  constructor() {
    this.formFieldsOptionsRepository = new FormFieldsOptionsRepository();
  }

  async getFormFieldsOptionsByFormFieldId(formFieldsId: number) {
    try {
      const data = await this.formFieldsOptionsRepository.findByFormFieldId(formFieldsId);
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error fetching form fields options:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  async createFormFieldOption(formFieldOptionData: any) {
    try {
      const savedOption = await this.formFieldsOptionsRepository.createFormFieldOption(formFieldOptionData);
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedOption);
    } catch (error: any) {
      console.error("Error creating form field option:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }
}
