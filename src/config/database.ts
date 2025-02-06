// In config/database.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
// import Product from "../models/product.model";
import("../models/product.model");

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`Database '${DB_NAME}' is ready.`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
}

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST,
  dialect: "mysql",
  logging: console.log,
});


async function initializeDatabase() {
  try {
    await createDatabase();

    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Check if models are loaded
    console.log("models ------------------", sequelize.models);

    // Sync models and create tables if they don't exist, or alter them if needed
    await sequelize.sync({ alter: true, force: false, logging: console.log });
    // // Insert default products if not already present
    // await Product.bulkCreate([
    //     { name: "pump" },
    //     { name: "turbine" },
    //     { name: "valve" }
    //   ], {
    //     ignoreDuplicates: true // Avoid duplicate entries if they already exist
    //   });
    
  
      console.log("Default products inserted successfully.");
    console.log("Database synced successfully with all models.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export { sequelize, initializeDatabase };
