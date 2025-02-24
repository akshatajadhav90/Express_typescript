import { AppDataSource } from "../config/database";
import { Form } from "../entities/forms.entity";
import { Repository } from "typeorm";

export class FormRepository{

    private repository: Repository<Form>;

    constructor() {
        this.repository = AppDataSource.getRepository(Form);
   }

   async findAll(): Promise<Form[]> {
    return await this.repository.find({ where: { is_deleted: 0 }, relations: ["subForms","subForms.formFields"] });  
  }

   async createForm(formName: string, productGateMapId: number): Promise<Form> {
    const newForm = this.repository.create({ formName, productGateMapId });
    return await this.repository.save(newForm);
  }

  async findById(id: number): Promise<Form | null> {
    return await this.repository.findOne({
      where: { id, is_deleted: 0 },
      relations: ["subForms", "subForms.formFields","subForms.formFields.formFieldOptions"], // Fetch subForms and formFields
    });
  }
  

}