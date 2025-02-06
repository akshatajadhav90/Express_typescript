import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/database";
import productRoutes from './routes/product.routes'; // Import product routes


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Start the server after database initialization
initializeDatabase()
  .then(() => {
    app.use('/api/products', productRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });
