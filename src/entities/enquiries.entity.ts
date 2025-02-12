import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("enquiries")
export class Enquiry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  /* @Column({ type: "number", unique: true })
  dolphinQuote!: number;

  @Column({ type: "number", unique: true })
  soNumber!: number;

  @Column({ type: "varchar", length: 255 })
  customerName!: string;

  @Column({ type: "varchar", length: 255 })
  gateStatus!: string;

  @Column({ type: "varchar", length: 255 })
  pendingWith!: string;

  @Column({ type: "varchar", length: 255 })
  pendingFrom!: string;

  @Column({ type: "varchar", length: 255 })
  gate!: string;

  @Column({ type: "varchar", length: 255 })
  kam!: string;

  @Column({ type: "varchar", length: 100 })
  applicationEngineer!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  enquiryCost!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  revertBy!: string;

  @Column({ type: "text", nullable: true })
  history?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date; */
}