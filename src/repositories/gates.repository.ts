// src/repositories/gates.repository.ts

import { AppDataSource } from "../config/database";
import { Gates } from "../entities/gates.entity";
import { Repository } from "typeorm";
import { Products_gates_mapping } from "../entities/product-gates-mapping.entity";
import { Product } from "../entities/product.entity";

export class GatesRepository {
  private repository: Repository<Gates>;

  constructor() {
    this.repository = AppDataSource.getRepository(Gates);
  }

  /*
   Fetch all gates
   */

  async findAll(): Promise<Gates[]> {
    return await this.repository.find();
  }

  /*
   Create a new gate
   */

  async createGate(
    name: string,
    productId: string,
    display_order: number
  ): Promise<Gates> {
    // Check if the gate already exists
    let existingGate = await this.repository.findOne({ where: { name } });

    if (!existingGate) {
      // Create a new gate if it doesn't exist
      const newGate = this.repository.create({ name });
      existingGate = await this.repository.save(newGate);
    }

    // Check if the product-gate mapping already exists
    const mappingExists = await AppDataSource.getRepository(
      Products_gates_mapping
    ).findOne({
      where: {
        product: { id: Number(productId) },
        gate: { id: existingGate.id },
      },
    });

    if (mappingExists) {
      throw new Error(
        `The gate "${name}" already exists for the selected product.`
      );
    }

    if (!mappingExists) {
      // Find the product and check if it exists
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: Number(productId) },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      const newMapping = AppDataSource.getRepository(
        Products_gates_mapping
      ).create({
        product,
        gate: existingGate,
        display_order,
      });

      await AppDataSource.getRepository(Products_gates_mapping).save(
        newMapping
      );
    }

    return existingGate;
  }

  /* 
  Fetch gates associated with product
  */

  async productGates(productId: string): Promise<Products_gates_mapping[]> {
    // Find the product and check if it exists
    const product = await AppDataSource.getRepository(Product).find({
      where: { id: Number(productId) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // fetch the product-gate mapping data
    const mappingData = await AppDataSource.getRepository(
      Products_gates_mapping
    ).find({
      relations: ["product", "gate"],

      select: {
        id: true,
        display_order: true,
        gate: {
          id: true,
          name: true,
        },
        product: {}, // exclude all column
      },
      where: {
        product: { id: Number(productId) },
      },
      order: {
        display_order: "ASC",
      },
    });

    return mappingData;
  }
}
