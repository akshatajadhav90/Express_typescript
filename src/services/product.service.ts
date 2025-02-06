// src/services/product.service.ts
import Product from "../models/product.model";

// Service to fetch all products
export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error("Error in product service (getAllProducts):", error);
    throw error;
  }
};

// Service to create a new product
export const createProduct = async (name: string) => {
  try {
    const newProduct = await Product.create({ name });
    return newProduct;
  } catch (error) {
    console.error("Error in product service (createProduct):", error);
    throw error;
  }
};
