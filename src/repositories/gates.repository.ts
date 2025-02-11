// src/repositories/product.repository.ts

import { AppDataSource } from "../config/database";
import { Gates } from "../entities/gates.entity";
import { Repository } from "typeorm";

// Get the TypeORM repository
export const gatesRepository: Repository<Gates> = AppDataSource.getRepository(Gates);

// Fetch all products
export const findAllGates = async (): Promise<Gates[]> => {
  return await gatesRepository.find();
};

// Create a new product
export const createNewGate = async (name: string): Promise<Gates> => {
  const newProduct = gatesRepository.create({ name });
  return await gatesRepository.save(newProduct);
};
