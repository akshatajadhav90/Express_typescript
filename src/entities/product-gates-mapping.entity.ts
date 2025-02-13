import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product.entity";
import { Gates } from "./gates.entity";
import { BaseEntity } from "./base.entity";

@Entity("products_gates_mapping")
export class Products_gates_mapping extends BaseEntity {
  
  @ManyToOne(() => Product, (product) => product.products_gates_mapping, {
    onDelete: "RESTRICT", // Prevents deletion if mappings exist
  })
  @JoinColumn({ name: "product_id" }) // Explicitly map to the "product_id" column in the DB
  product!: Product;

  @ManyToOne(() => Gates, (gate) => gate.products_gates_mapping, {
    onDelete: "RESTRICT", // Prevents deletion if mappings exist
  })
  @JoinColumn({ name: "gate_id" }) // Explicitly map to the "gate_id" column in the DB
  gate!: Gates;
}
