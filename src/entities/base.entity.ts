import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @CreateDateColumn({ type: "timestamp"})
    created_at!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
  
    @Column({ type: "timestamp" })
    deleted_at!: Date;
  }
  