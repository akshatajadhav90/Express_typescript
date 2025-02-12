// src/routes/product.routes.ts
import express from "express";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.get("/", (req, res) => productController.getProducts(req, res));
router.post("/create", (req, res) => productController.createProduct(req, res));

export default router;
