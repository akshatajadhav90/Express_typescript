import { AppDataSource } from "../config/database";
import { FormField } from "../entities/formFields.entity";
import { Repository } from "typeorm";

export class FormFieldRepository {
  private repository: Repository<FormField>;

  constructor() {
    this.repository = AppDataSource.getRepository(FormField);
  }

  async findAll(): Promise<FormField[]> {
    return await this.repository.find({ relations: ["subForm"] });
  }

  async createFormField(
    name: string,
    subFormId: number,
    field_type: string,
    type: string,
    is_required: number,
    is_editable: number,
    is_sort: number,
    order: number,
    colspan: number,
    rowspan: number
  ): Promise<FormField> {
    const newFormField = this.repository.create({
      name, subForm: { id: subFormId }, field_type, type, is_required, is_editable, is_sort, order, colspan, rowspan
    });
    return await this.repository.save(newFormField);
  }

  async findById(id: number): Promise<FormField | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["subForm"],
    });
  }
  
}
