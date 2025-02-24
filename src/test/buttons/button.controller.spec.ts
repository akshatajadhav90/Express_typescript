import { ButtonController } from "../../controllers/button.controller";
import { ButtonService } from "../../services/button.service";
import { Request, Response } from "express";

jest.mock("../../services/button.service"); // Mock the whole module

describe("ButtonController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let buttonController: ButtonController;
  let mockButtonService: jest.Mocked<ButtonService>;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Get the mocked service from jest
    mockButtonService = new (ButtonService as jest.Mock)();

    mockButtonService.createButton = jest.fn();

    buttonController = new ButtonController(mockButtonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("createButton", () => {
    it("should throw req body required error", async () => {
      req.body = {};
      const mockError = { error: "Request body required" };
      // Call the controller function
      await buttonController.createButton(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(mockError);
    });

    it("should create a button", async () => {
      const mockResult = {
        success: true,
        statusCode: 201,
        message: "Button added successfully",
        data: {
          label: "abc",
          icon: "http://hdhhhhhhh.com",
        },
      };

      req.body = mockResult;
      // Mock the method inside the mocked service
      (mockButtonService.createButton as jest.Mock).mockResolvedValue(
        mockResult
      );

      // Call the controller function
      await buttonController.createButton(req as Request, res as Response);

      // Expect the service function to be called correctly
      expect(mockButtonService.createButton).toHaveBeenCalledWith(mockResult);

      // Expect the response to be correct
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 500 when an error occurs in createButton", async () => {
      req.body = { name: "test" };
      const mockError = new Error("Database connection failed");
      (mockButtonService.createButton as jest.Mock).mockRejectedValue(
        mockError
      );

      // Call the controller function
      await buttonController.createButton(req as Request, res as Response);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError });
    });
  });
});
