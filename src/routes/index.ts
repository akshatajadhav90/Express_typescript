import express from "express";
import productRoutes from "./product.routes";
import gatesRoutes from "./gates.routes";
import userRoutes from "./user.routes";

const router = express.Router();

// Mount all route modules here
router.use("/products", productRoutes);
router.use("/gates", gatesRoutes);
router.use("/user", userRoutes);

export default router;
