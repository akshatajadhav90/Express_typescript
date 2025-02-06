// src/routes/product.routes.ts
import { Router } from "express";
import { getProducts, createProducts} from "../controllers/product.controller"

const router = Router();

// Route to get all products
router.get("/get_products", getProducts)

// // Route to create a new product
router.post("/add_product", createProducts);


export default router;  