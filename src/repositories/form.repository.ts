import { AppDataSource } from "../config/database";
import { Form } from "../entities/forms.entity";
import { Repository } from "typeorm";

export class FormRepository{

    private repository: Repository<Form>;

    constructor() {
        this.repository = AppDataSource.getRepository(Form);
   }

   async findAll(): Promise<Form[]> {
    return await this.repository.find({ relations: ["subForms"] });  
  }

   async createForm(formName: string, productGateMapId: number): Promise<Form> {
    const newForm = this.repository.create({ formName, productGateMapId });
    return await this.repository.save(newForm);
  }

}