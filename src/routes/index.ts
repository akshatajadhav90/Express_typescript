import express from "express";
import productRoutes from "./product.routes";
import gatesRoutes from "./gates.routes";

const router = express.Router();

// Mount all route modules here
router.use("/products", productRoutes);
router.use("/gates", gatesRoutes);

export default router;
