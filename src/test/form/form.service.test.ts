import { FormService } from "../../services/form.service";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";
import { successResponse, errorResponse } from "../../utils/responseHelper";

describe("FormService - getAllForms", () => {
  let formService: FormService;

  beforeEach(() => {
    formService = new FormService();
  });

  it("should return a success response with forms data", async () => {
    const mockData = [
      { id: 1, formName: "Form 1", productGateMapId: 101 },
      { id: 2, formName: "Form 2", productGateMapId: 102 },
    ];

    (formService as any).formRepository.findAll = jest.fn().mockResolvedValue(mockData);

    const response = await formService.getAllForms();

    expect(response).toEqual(
      successResponse(STATUS_CODES.SUCCESS, MESSAGES.FETCH_SUCCESS, mockData)
    );
  });

  it("should return an error response when repository.findAll throws an error", async () => {
    const error = new Error("Database error");


    (formService as any).formRepository.findAll = jest.fn().mockRejectedValue(error);

    const response = await formService.getAllForms();

    expect(response).toEqual(
      errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message)
    );
  });

});

describe("FormService - createForm", () => {
  
    let formService: FormService;

    beforeEach(() => {
      formService = new FormService();
    });

    it("should return a success response when form is created successfully", async () => {
      const formName = "Test Form";
      const productGateMapId = 101;
      const mockCreatedForm = { id: 1, formName, productGateMapId };

      (formService as any).formRepository.createForm = jest.fn().mockResolvedValue(mockCreatedForm);

      const response = await formService.createForm(formName, productGateMapId);

      expect(response).toEqual(
        successResponse(STATUS_CODES.CREATED, MESSAGES.CREATED_SUCCESS, mockCreatedForm)
      );
    });

    it("should return an error response when repository.createForm throws an error", async () => {
      const formName = "Test Form";
      const productGateMapId = 101;
      const error = new Error("Database error");

      (formService as any).formRepository.createForm = jest.fn().mockRejectedValue(error);

      const response = await formService.createForm(formName, productGateMapId);

      expect(response).toEqual(
        errorResponse(STATUS_CODES.SERVER_ERROR, MESSAGES.INTERNAL_SERVER, error.message)
      );
    }); });

describe("FormService - getFormById",()=>{
    let formService: FormService;

    beforeEach(() => {
      formService = new FormService();
    });

    it("should return a success response when form is found", async () => {
        const formId = 123;
        const mockForm = { id: formId, formName: "Sample Form", productGateMapId: 456 };
  
        (formService as any).formRepository.findById = jest.fn().mockResolvedValue(mockForm);
  
        const response = await formService.getFormById(formId);
  
        expect(response).toEqual(
          successResponse(200, "Form fetched successfully", mockForm)
        );
      });
  
      it("should return null when no form is found", async () => {
        const formId = 123;
  
        (formService as any).formRepository.findById = jest.fn().mockResolvedValue(null);
  
        const response = await formService.getFormById(formId);
  
        expect(response).toBeNull();
      });
  
      it("should return an error response when repository.findById throws an error", async () => {
        const formId = 123;
        const error = new Error("Repository error");
  
        (formService as any).formRepository.findById = jest.fn().mockRejectedValue(error);
  
        const response = await formService.getFormById(formId);
  
        expect(response).toEqual(
          errorResponse(500, "Internal Server Error", error.message)
        );
      });
})    