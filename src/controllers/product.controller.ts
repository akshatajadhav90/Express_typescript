// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { MESSAGES } from "../constants/messages";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Controller to fetch all products
  public async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error in ProductController (getProducts):", error);
      res.status(500).json({ error: error });
    }
  }

  // Controller to create a new product
  public async createProduct(req: Request, res: Response): Promise<void> {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ error: MESSAGES.REQUEST_BODY_REQUIRED });
      return;
    }

    const { name } = req.body;

    try {
      const newProduct = await this.productService.createProduct(name);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error in ProductController (createProduct):", error);
      res.status(500).json({ error: error });
    }
  }
}

export const productController = new ProductController();
