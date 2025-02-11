import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
