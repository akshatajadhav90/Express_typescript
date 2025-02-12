import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("users")
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    firstName!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false })
    lastName!: string;
  
    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email!: string;
  
    @Column({ type: "bigint", nullable: false })
    phoneNumber!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    password!: string;
  
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
  }