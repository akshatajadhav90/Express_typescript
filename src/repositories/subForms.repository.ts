// src/repositories/product.repository.ts
import { AppDataSource } from "../config/database";
import { SubForm } from "../entities/subForms.entity";
import { Repository } from "typeorm";

export class SubFormRepository {
  private subFormRepository: Repository<SubForm>;

  constructor() {
    this.subFormRepository = AppDataSource.getRepository(SubForm);
  }

  // Fetch all products
  public async findAllSubForm(): Promise<SubForm[]> {
    return await this.subFormRepository.find();
  }

  // Create a new product
  public async createSubForm(label: string, formId: number, type: string, category: string, order: number): Promise<SubForm> {
    const newSubForm = this.subFormRepository.create({ label, formId, type, category, order });
    return await this.subFormRepository.save(newSubForm);
  }
}
