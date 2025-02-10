import "reflect-metadata";
import { DataSource } from "typeorm";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Product } from "../entities/product";
import { Gates } from "../entities/gates";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// All entities (tables)
const entities = [Product, Gates]; // Add all TypeORM models here

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

  try{
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
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
    
      try {
        const metadata = AppDataSource.getMetadata(entity); // Fetch metadata

        const columns = metadata.columns
          .map((col) => {
            let sqlType = col.type;
            let length = col.length || null; // Fetch length if defined
        
            // Convert JavaScript types to valid SQL types
            if (typeof sqlType === "function") {
              if (sqlType === Number) sqlType = "int";
              else if (sqlType === String) sqlType = "varchar";
              else if (sqlType === Date) sqlType = "datetime";
              else sqlType = "text"; // Default for unknown types
            }
        
            // Append length only when applicable
            if (sqlType === "varchar" && length) {
              sqlType += `(${length})`; // Example: varchar(255)
            }
        
            return `\`${col.databaseName}\` ${sqlType}`;
          })
          .join(", ");
        
        const createTableQuery = `CREATE TABLE \`${tableName}\` (${columns})`;
        
        await queryRunner.query(createTableQuery); // Execute query        
      } catch (error) {
        console.error(`Error creating table ${tableName}:`, error);
      } finally {
        await queryRunner.release();
      }
    }
    
    
    else {
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
          if (columnDefinition.length) {
            await connection.query(
              `ALTER TABLE ${tableName} ADD COLUMN ${column} ${columnDefinition.type} ( ${columnDefinition.length} )`
            );
          } else {
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
catch(error)
{
  console.error("error in catch syncDatabaseSchema ======================", error)
  throw error;
}
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities, 
  synchronize: false, // Disable auto-sync
  logging: false,
});

/**
 * Function to initialize the database (Create DB if not exists + Connect TypeORM)
 */
export const initializeDatabase = async () => {
  try {
    await createDatabase(); // Ensure database exists first
    await AppDataSource.initialize(); //  Connect TypeORM after DB is ready

    await syncDatabaseSchema();
  } catch (error) {
    console.error("Error initializing database==========================", error);
    throw error;
  }
};
