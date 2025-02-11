import express from "express";
import { getProducts, createProducts } from "../controllers/product.controller";

const router = express.Router();

// Route to get all products
router.get("/", getProducts);

// Route to create a new product
router.post("/create", createProducts);

export default router; 
