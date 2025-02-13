import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Products_gates_mapping } from "./product-gates-mapping.entity";
 
@Entity("gates")
export class Gates {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;
 
  @Column({ type: "int", nullable: false })
  display_order!: number;
 
  @CreateDateColumn({ type: "datetime", nullable: false })
  created_at!: Date;
 
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updated_at!: Date;
 
  @OneToMany(() => Products_gates_mapping, (mapping) => mapping.gate)
  products_gates_mapping!: Products_gates_mapping[];
}