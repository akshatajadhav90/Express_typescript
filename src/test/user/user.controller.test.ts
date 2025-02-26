import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { MESSAGES } from "../../constants/messages";
import { Request, Response } from "express";
 
jest.mock("../../services/user.service");
 
describe("UserController - register", () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
 
  beforeEach(() => {
    userController = new UserController();
 
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
 
    mockRequest = {};
    mockResponse = {
      json: jsonMock,
      status: statusMock,
    };
  });
 
  it("should return 400 if request body is empty", async () => {
    mockRequest.body = {};
 
    await userController.register(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: MESSAGES.REQUEST_BODY_REQUIRED,
    });
  });
 
  it("should register a new user and return 201", async () => {
    const mockUserData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phoneNumber: "1234567890",
    };
 
    const mockResponseData = {
      status: "success",
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: { id: 1, ...mockUserData, token: "mockToken" },
    };
 
    (UserService.prototype.registerUser as jest.Mock).mockResolvedValue(mockResponseData);
 
    mockRequest.body = mockUserData;
 
    await userController.register(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith(mockResponseData);
  });
 
  it("should return 500 if an error occurs in the service", async () => {
    mockRequest.body = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phoneNumber: "1234567890",
    };
 
    (UserService.prototype.registerUser as jest.Mock).mockRejectedValue(new Error("Database error"));
 
    await userController.register(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: "Database error",
    });
  });
});
 
describe("UserController - login", () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
 
  beforeEach(() => {
    userController = new UserController();
 
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
 
    mockRequest = {};
    mockResponse = {
      json: jsonMock,
      status: statusMock,
    };
  });
 
  it("should return 400 if email or password is missing", async () => {
    mockRequest.body = { email: "john@example.com" }; // missing password
 
    await userController.login(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: MESSAGES.REQUEST_BODY_REQUIRED,
    });
  });
 
  it("should return 200 and login the user successfully", async () => {
    const mockLoginData = {
      email: "john@example.com",
      password: "password123",
    };
 
    const mockResponseData = {
      status: "success",
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
      data: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        token: "mockToken",
      },
    };
 
    (UserService.prototype.loginUser as jest.Mock).mockResolvedValue(mockResponseData);
 
    mockRequest.body = mockLoginData;
 
    await userController.login(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockResponseData);
  });
 
  it("should return 401 if credentials are invalid", async () => {
    const mockLoginData = {
      email: "john@example.com",
      password: "wrongpassword",
    };
 
    (UserService.prototype.loginUser as jest.Mock).mockResolvedValue({
      status: "error",
      message: MESSAGES.AUTH.INVALID_CREDENTIALS,
    });
 
    mockRequest.body = mockLoginData;
 
    await userController.login(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      status: "error",
      message: MESSAGES.AUTH.INVALID_CREDENTIALS,
    });
  });
 
  it("should return 500 if an error occurs in the service", async () => {
    mockRequest.body = {
      email: "john@example.com",
      password: "password123",
    };
 
    (UserService.prototype.loginUser as jest.Mock).mockRejectedValue(new Error("Database error"));
 
    await userController.login(mockRequest as Request, mockResponse as Response);
 
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
 