import { ButtonService } from "../../services/button.service";
import { ButtonRepository } from "../../repositories/button.repository";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";
import { successResponse, errorResponse } from "../../utils/responseHelper";
import { Button } from "../../entities/buttons.entity";

jest.mock("../../repositories/button.repository");

describe("ButtonService", () => {
  let buttonService: ButtonService;
  let mockButtonRepository: jest.Mocked<ButtonRepository>;

  beforeEach(() => {
    mockButtonRepository = {
      createNewButton: jest.fn(),
    } as unknown as jest.Mocked<ButtonRepository>;

    buttonService = new ButtonService(mockButtonRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("createButton", () => {
    it("should create a button successfully", async () => {
      // Mock request data
      const requestData = { name: "Test Button" };
      const savedButton: Button = {
        id: 1,
        label: "Test Button",
        icon: "test-icon",
        mappings: [],
        created_at: new Date(),
        updated_at: new Date(),
        is_deleted: 0,
      };
      // Mock repository function to return the created button
      mockButtonRepository.createNewButton.mockResolvedValue(savedButton);

      // Call service method
      const response = await buttonService.createButton(requestData);

      // Expected success response
      const expectedResponse = successResponse(
        STATUS_CODES.CREATED,
        MESSAGES.CREATED_SUCCESS,
        savedButton
      );

      // Assertions
      expect(mockButtonRepository.createNewButton).toHaveBeenCalledWith(
        requestData
      );
      expect(response).toEqual(expectedResponse);
    });

    it("should return an error response when repository throws an error", async () => {
      // Mock request data
      const requestData = { name: "Test Button" };
      const mockError = new Error("Database connection failed");

      // Mock repository function to throw an error
      mockButtonRepository.createNewButton.mockRejectedValue(mockError);

      // Spy on console.error to prevent actual console logs in test output
      jest.spyOn(console, "error").mockImplementation(() => {});

      // Call service method
      const response = await buttonService.createButton(requestData);

      // Expected error response
      const expectedResponse = errorResponse(
        STATUS_CODES.SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER,
        mockError.message
      );

      // Assertions
      expect(mockButtonRepository.createNewButton).toHaveBeenCalledWith(
        requestData
      );
      expect(response).toEqual(expectedResponse);
      expect(console.error).toHaveBeenCalledWith(
        "Error in ButtonService (createButton):",
        mockError
      );
    });
  });
});
