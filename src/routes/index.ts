import express from "express";
import productRoutes from "./product.routes";
import gatesRoutes from "./gates.routes";
import userRoutes from "./user.routes";
import formRoutes from "./form.routes";

const router = express.Router();

// Mount all route modules here
router.use("/products", productRoutes);
router.use("/gates", gatesRoutes);
router.use("/user", userRoutes);
router.use("/forms",formRoutes);

export default router;
