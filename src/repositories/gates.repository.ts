// src/repositories/gates.repository.ts

import { AppDataSource } from "../config/database";
import { Gates } from "../entities/gates.entity";
import { Repository } from "typeorm";

export class GatesRepository {
  private repository: Repository<Gates>;

  constructor() {
    this.repository = AppDataSource.getRepository(Gates);
  }

  // Fetch all gates
  async findAll(): Promise<Gates[]> {
    return await this.repository.find();
  }

  // Create a new gate
  async createGate(name: string): Promise<Gates> {
    const newGate = this.repository.create({ name });
    return await this.repository.save(newGate);
  }
}
