// src/repositories/product.repository.ts
import { AppDataSource } from "../config/database";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  // Fetch all products
  public async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Create a new product
  public async createNewProduct(name: string): Promise<Product> {
    const newProduct = this.productRepository.create({ name });
    return await this.productRepository.save(newProduct);
  }
}
