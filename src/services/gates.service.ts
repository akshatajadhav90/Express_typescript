// src/services/gates.service.ts

import { GatesRepository } from "../repositories/gates.repository";
import { STATUS_CODES } from "../constants/statusCodes";
import { MESSAGES } from "../constants/messages";
import { successResponse, errorResponse } from "../utils/responseHelper";

export class GatesService {
  private gatesRepository: GatesRepository;

  constructor() {
    this.gatesRepository = new GatesRepository();
  }

  // Fetch all gates
  async getAllGates() {
    try {
      const data = await this.gatesRepository.findAll();
      return successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, data);
    } catch (error: any) {
      console.error("Error fetching gates:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }

  // Create a new gate
  async createGate(name: string) {
    try {
      const savedGate = await this.gatesRepository.createGate(name);
      return successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, savedGate);
    } catch (error: any) {
      console.error("Error creating gate:", error);
      return errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message);
    }
  }
}
