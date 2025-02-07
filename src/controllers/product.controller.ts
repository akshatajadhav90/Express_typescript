// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { getAllProducts, createProduct } from "../services/product.service";
import { MESSAGES } from "../constants/messages";

// Controller to fetch all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in product controller (getProducts):", error);
    res.status(500).json({ error: error });
  }
};

// Controller to create a new product
export const createProducts= async (req: Request, res: Response): Promise<any> =>{
  
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
  }
  const { name } = req.body;

  try {
    const newProduct = await createProduct(name);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in product controller (createProductHandler):", error);
    res.status(500).json({ error: error });
  }
};
