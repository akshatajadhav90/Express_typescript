import { AppDataSource } from "../config/database";
import { Product } from "../entities/product";

// Get the TypeORM repository
const productRepository = AppDataSource.getRepository(Product);

// Fetch all products
export const getAllProducts = async () => {
  try {
    return await productRepository.find(); // TypeORM Query
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (name: string) => {
  try {
    const newProduct = productRepository.create({ name }); // TypeORM Entity creation
    return await productRepository.save(newProduct); // Saves it to the database
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
