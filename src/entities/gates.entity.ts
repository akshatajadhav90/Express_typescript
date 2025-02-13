import {
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { Products_gates_mapping } from "./product-gates-mapping.entity";
import { BaseEntity } from "./base.entity";
 
@Entity("gates")
export class Gates  extends BaseEntity{

 
  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;
 
  @Column({ type: "int", nullable: false })
  display_order!: number;
 
  @OneToMany(() => Products_gates_mapping, (mapping) => mapping.gate)
  products_gates_mapping!: Products_gates_mapping[];
}