import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products_gates_mapping")
export class Products_gates_mapping {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  product_id!: string;

  @Column({ type: "int", nullable: false })
  gate_id!: number;
  
  @CreateDateColumn({ type: "datetime", nullable: false })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", nullable: false })
  updated_at!: Date;
}
