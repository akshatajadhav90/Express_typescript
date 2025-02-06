// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { getAllProducts, createProduct } from "../services/product.service";

// Controller to fetch all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log("inside getProducts----------------------")
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in product controller (getProducts):", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Controller to create a new product
export const createProducts= async (req: Request, res: Response): Promise<any> =>{
  console.log("inside create product-----------------")
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const newProduct = await createProduct(name);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in product controller (createProductHandler):", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
