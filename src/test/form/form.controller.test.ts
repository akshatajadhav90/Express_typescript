import { FormController } from "../../controllers/form.controller";
import { FormService } from "../../services/form.service";
import { MESSAGES } from "../../constants/messages";
import { Request, Response } from "express";

jest.mock("../../services/form.service");

describe("FormController - getForms", () => {
    let formController: FormController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
  
    beforeEach(() => {
      formController = new FormController();
  
      jsonMock = jest.fn();
      statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
      mockRequest = {};
      mockResponse = {
        json: jsonMock,
        status: statusMock,
      };
    });
  
    it("should return a list of forms with status 200", async () => {
      const mockForms = [
        { id: 1, formName: "Form A", productGateMapId: 101 },
        { id: 2, formName: "Form B", productGateMapId: 102 },
      ];
  
      (FormService.prototype.getAllForms as jest.Mock).mockResolvedValue(mockForms);
  
      await formController.getForms(mockRequest as Request, mockResponse as Response);
  
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockForms);
    });
  
    it("should return 500 if an error occurs", async () => {
      (FormService.prototype.getAllForms as jest.Mock).mockRejectedValue(new Error("Database error"));
  
      await formController.getForms(mockRequest as Request, mockResponse as Response);
  
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: MESSAGES.INTERNAL_SERVER });
    });
  });


describe("Formcontroller-createform",()=>{
   
    let formController: FormController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
  
    beforeEach(() => {
      formController = new FormController();
  
      jsonMock = jest.fn();
      statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
      mockRequest = {};
      mockResponse = {
        json: jsonMock,
        status: statusMock,
      };
    });
   
    it("should create a form and return 201",async()=>{

        const mockFormData = { formName: "Test Form", productGateMapId: 101 };
        const mockNewForm = { id: 1, ...mockFormData };

        (FormService.prototype.createForm as jest.Mock).mockResolvedValue( mockNewForm);

        mockRequest.body = mockFormData;
        
        await formController.createForm(mockRequest as Request, mockResponse as Response);
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(mockNewForm);
    })

    it("should return 400 if request body is empty",async()=>{
    
        mockRequest.body = {};
        await formController.createForm(mockRequest as Request, mockResponse as Response);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ error:  MESSAGES.MISSING_FIELDS  });

    })

    it("should return 500 if FormService.createForm throws an error", async () => {
        mockRequest.body = { formName: "Test Form", productGateMapId: 101 };
    
        (FormService.prototype.createForm as jest.Mock).mockRejectedValue(new Error("Database error"));
    
        await formController.createForm(mockRequest as Request, mockResponse as Response);
    
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: MESSAGES.INTERNAL_SERVER });
      });




  });

describe("Formcontroller-getFormById",()=>{
        
    let formController: FormController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
  
    beforeEach(() => {
      formController = new FormController();
  
      jsonMock = jest.fn();
      statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
      mockRequest = {};
      mockResponse = {
        json: jsonMock,
        status: statusMock,
      };
    });

    it("should return 400 if formId is not provided",async()=>{
        mockRequest.params = {};

        await formController.getFormById(mockRequest as Request, mockResponse as Response);
    
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ error: "Form ID is required" });
    });

    it("should return 404 if form is not found",async()=>{
      mockRequest.params = { formId: "123" };
      (FormService.prototype.getFormById as jest.Mock).mockResolvedValue(null);

      await formController.getFormById(mockRequest as Request, mockResponse as Response);
      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Form not found" });
    });

    it("should return 200 with the form data when found",async()=>{
      const mockForm = { id: 123, formName: "Sample Form", productGateMapId: 456 };
      mockRequest.params = { formId: "123" };
      (FormService.prototype.getFormById as jest.Mock).mockResolvedValue(mockForm);

      await formController.getFormById(mockRequest as Request, mockResponse as Response);
  
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockForm);

    });

    it("should return 500 if an error occurs in the service layer", async () => {
   
      mockRequest.params = { formId: "123" };
      (FormService.prototype.getFormById as jest.Mock).mockRejectedValue(new Error("Some error"));
  
      await formController.getFormById(mockRequest as Request, mockResponse as Response);
  
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
})  