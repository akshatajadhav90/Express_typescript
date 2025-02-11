// src/repositories/product.repository.ts

import { AppDataSource } from "../config/database";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

// Get the TypeORM repository
export const productRepository: Repository<Product> = AppDataSource.getRepository(Product);

// Fetch all products
export const findAllProducts = async (): Promise<Product[]> => {
  return await productRepository.find();
};

// Create a new product
export const createNewProduct = async (name: string): Promise<Product> => {
  const newProduct = productRepository.create({ name });
  return await productRepository.save(newProduct);
};
