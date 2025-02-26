import { FormRepository } from "../../repositories/form.repository";
import { Form } from "../../entities/forms.entity";
import { Repository } from "typeorm";

describe("Repositories-findAll",()=>{
    let formRepository: FormRepository;
    let mockRepository: Partial<Repository<Form>>;

    beforeEach(() => {
        formRepository = new FormRepository();
        mockRepository = {
          find: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        };
      
        (formRepository as any).repository = mockRepository;
      });

      it("should return all forms with is_deleted = 0 and specified relations",async()=>{
        
        const forms: Form[] = [
            ({
              id: 1,
              formName: "Form 1",
              productGateMapId: 101,
              is_deleted: 0,
              subForms: [],
              created_at: new Date(),
              updated_at: new Date(),
            } as unknown) as Form,
            ({
              id: 2,
              formName: "Form 2",
              productGateMapId: 102,
              is_deleted: 0,
              subForms: [],
              created_at: new Date(),
              updated_at: new Date(),
            } as unknown) as Form,
          ];

          (mockRepository.find as jest.Mock).mockResolvedValue(forms);

          const result = await formRepository.findAll();
    
          expect(mockRepository.find).toHaveBeenCalledWith({
            where: { is_deleted: 0 },
            relations: ["subForms", "subForms.formFields"],
          });
          expect(result).toEqual(forms);

      });

});

describe("createForm", () => {

    let formRepository: FormRepository;
    let mockRepository: Partial<Repository<Form>>;

    beforeEach(() => {
        formRepository = new FormRepository();
        mockRepository = {
          find: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        };
      
        (formRepository as any).repository = mockRepository;
      });


    it("should create and save a new form", async () => {
      const formName = "New Form";
      const productGateMapId = 101;
      const newFormData = { formName, productGateMapId };

      const savedForm = ({
        id: 1,
        formName,
        productGateMapId,
        is_deleted: 0,
        subForms: [],
        created_at: new Date(),
        updated_at: new Date(),
      } as unknown) as Form;


      (mockRepository.create as jest.Mock).mockReturnValue(newFormData);
      (mockRepository.save as jest.Mock).mockResolvedValue(savedForm);

      const result = await formRepository.createForm(formName, productGateMapId);

      expect(mockRepository.create).toHaveBeenCalledWith({ formName, productGateMapId });
      expect(mockRepository.save).toHaveBeenCalledWith(newFormData);
      expect(result).toEqual(savedForm);
    });
  });

describe("findById", () => {

    let formRepository: FormRepository;
    let mockRepository: Partial<Repository<Form>>;

    beforeEach(() => {
        formRepository = new FormRepository();
        mockRepository = {
          find: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
        };
      
        (formRepository as any).repository = mockRepository;
      });

    it("should return a form when found", async () => {
      const formId = 1;
      const foundForm = ({
        id: formId,
        formName: "Found Form",
        productGateMapId: 101,
        is_deleted: 0,
        subForms: [],
        created_at: new Date(),
        updated_at: new Date(),
      } as unknown) as Form;

      (mockRepository.findOne as jest.Mock).mockResolvedValue(foundForm);

      const result = await formRepository.findById(formId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: formId, is_deleted: 0 },
        relations: ["subForms", "subForms.formFields", "subForms.formFields.formFieldOptions"],
      });
      expect(result).toEqual(foundForm);
    });

    it("should return null when no form is found", async () => {
      const formId = 2;
      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await formRepository.findById(formId);

      expect(result).toBeNull();
    });
  });
