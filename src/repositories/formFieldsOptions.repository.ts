import { AppDataSource } from "../config/database";
import { FormFieldsOptions } from "../entities/fieldOptions.entity";
import { Repository } from "typeorm";

export class FormFieldsOptionsRepository {
  private repository: Repository<FormFieldsOptions>;

  constructor() {
    this.repository = AppDataSource.getRepository(FormFieldsOptions);
  }

  async findByFormFieldId(formFieldsId: number): Promise<FormFieldsOptions[]> {
    return await this.repository.find({
      where:  { id: formFieldsId } 
    });
  }

  async createFormFieldOption(formFieldOptionData: Partial<FormFieldsOptions>): Promise<FormFieldsOptions> {
    const newOption = this.repository.create(formFieldOptionData);
    return await this.repository.save(newOption);
  }
}
