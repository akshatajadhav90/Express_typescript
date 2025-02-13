import { Entity, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { Gates } from "./gates.entity";
import { BaseEntity } from "./base.entity";

@Entity("products_gates_mapping")
export class Products_gates_mapping extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.products_gates_mapping, {
    onDelete: "RESTRICT", // Prevents deletion if mappings exist
  })
  product!: Product;

  @ManyToOne(() => Gates, (gate) => gate.products_gates_mapping, {
    onDelete: "RESTRICT", // Prevents deletion if mappings exist
  })
  gate!: Gates;
}
