import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Product } from "./product.entity";
import { Gates } from "./gates.entity";
import { BaseEntity } from "./base.entity";

@Entity("products_gates_mapping")
export class Products_gates_mapping extends BaseEntity {
  @Column({ type: "int", nullable: false, default:0 })
  display_order!: number;

  @ManyToOne(() => Product, (product) => product.products_gates_mapping, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @ManyToOne(() => Gates, (gate) => gate.products_gates_mapping, {
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "gate_id" })
  gate!: Gates;
}
