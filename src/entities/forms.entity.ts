import {
  Entity,
  Column,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { SubForm } from "./subForms.entity";

@Entity("forms")
export class Form extends BaseEntity{

  @Column({ type: "varchar", length: 255, nullable: false })
  formName!: string;

  @Column({ type: "integer", nullable: false })
  productGateMapId!: number;

  @OneToMany(() => SubForm, (subForm) => subForm.form, { cascade: true })
  subForms!: SubForm[];
}
