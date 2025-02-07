import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @CreateDateColumn({ type: "datetime",  nullable: false})
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime",  nullable: false})
  updated_at!: Date;
}
