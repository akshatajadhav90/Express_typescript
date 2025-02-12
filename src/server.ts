import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./config/database";
import routes from "./routes";

// import {indexRoute} from "./routes/index";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Start the server after database initialization
initializeDatabase()
  .then(() => {
    app.use("/api", routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });
