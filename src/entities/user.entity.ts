import {
    Entity,
    Column
  } from "typeorm";
import { BaseEntity } from "./base.entity";
  
  @Entity("users")
  export class User extends BaseEntity {
  
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
  
  }