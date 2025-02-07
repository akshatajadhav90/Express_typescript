import "reflect-metadata";
import { DataSource } from "typeorm";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Product } from "../entities/product"; // Import TypeORM Entity

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// All entities (tables)
const entities = [Product]; // Add all TypeORM models here

/**
 * Function to create database if it does not exist
 */
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

/**
 * Check if a table exists in the database
 */
async function tableExists(
  connection: any,
  tableName: string
): Promise<boolean> {
  const [rows] = await connection.query(
    `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
    [DB_NAME, tableName]
  );
  return rows[0].count > 0;
}

/**
 * Synchronize all tables: Create missing tables & add new columns dynamically
 */
async function syncDatabaseSchema() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  for (const entity of entities) {
    const tableName = AppDataSource.getMetadata(entity).tableName;
    const exists = await tableExists(connection, tableName);

    if (!exists) {
      console.log(`Creating table: ${tableName}`);
      await AppDataSource.synchronize(); // Creates all missing tables
    } else {
      console.log(`Checking schema updates for table: ${tableName}`);

      // Fetch existing columns
      const [columns] = (await connection.query(`DESCRIBE ${tableName}`)) as [
        any[],
        any
      ];
      const existingColumns = new Set(columns.map((col) => col.Field));

      // Get columns from TypeORM model
      const metadata = AppDataSource.getMetadata(entity);
      const modelColumns = metadata.columns.map((col) => col.databaseName);

      // Add missing columns
      const missingColumns = modelColumns.filter(
        (col) => !existingColumns.has(col)
      );

      for (const column of missingColumns) {
        const columnDefinition = metadata.columns.find(
          (col) => col.databaseName === column
        );
        if (columnDefinition) {
          console.log(`Adding column: ${column} to ${tableName}`);
          if(columnDefinition.length)
          {
            await connection.query(
              `ALTER TABLE ${tableName} ADD COLUMN ${column} ${columnDefinition.type} ( ${columnDefinition.length} )`
            );
          }
          else{
          await connection.query(
            `ALTER TABLE ${tableName} ADD COLUMN ${column} ${columnDefinition.type}`
          );
        }
        }
      }
    }
  }

  await connection.end();
}

// Initialize TypeORM DataSource
export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities, // Include all entities
  synchronize: false, // Disable auto-sync
  logging: true,
});

/**
 * Function to initialize the database (Create DB if not exists + Connect TypeORM)
 */
export const initializeDatabase = async () => {
  try {
    await createDatabase(); // Ensure database exists first
    await AppDataSource.initialize(); //  Connect TypeORM after DB is ready

    await syncDatabaseSchema();

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};
