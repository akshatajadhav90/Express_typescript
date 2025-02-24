import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { ButtonRepository } from "../repositories/button.repository";

export class ButtonService {
  private buttonRepository: ButtonRepository;
  
  constructor(buttonRepository?: ButtonRepository) {
    this.buttonRepository = buttonRepository || new ButtonRepository();
  }

  public async createButton(data: any) {
    try {
      const savedButton = await this.buttonRepository.createNewButton(data);
      return successResponse(
        STATUS_CODES.CREATED,
        MESSAGES.CREATED_SUCCESS,
        savedButton
      );
    } catch (error: any) {
      console.error("Error in ButtonService (createButton):", error);
      return errorResponse(
        STATUS_CODES.SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER,
        error.message
      );
    }
  }
}
