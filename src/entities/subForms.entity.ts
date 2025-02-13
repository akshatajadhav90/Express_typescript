import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { Form } from "./forms.entity";
import { FormField } from "./formFields.entity";
import { FormTables } from "./tableFields.entity";


@Entity("subForms")
export class SubForm extends BaseEntity {
  @Column({ type: "varchar", length: 255, nullable: false })
  label!: string;

  @ManyToOne(() => Form, (form) => form.subForms, { onDelete: "CASCADE" })
  @JoinColumn({ name: "formId" }) // Specifies the foreign key column
  form!: Form;

  @Column({ type: "integer", nullable: false })
  formId!: number;

  @Column({ type: "varchar", length: 255 })
  type!: string;

  @Column({ type: "varchar", length: 255 })
  category!: string;

  @Column({ type: "integer", nullable: false })
  order!: number;

  @OneToMany(() => FormField, (formField) => formField.subForm, { cascade: true })
  formFields!: FormField[];

  @OneToMany(() => FormTables, (table) => table.subForm, { cascade: true })
  tables!: FormTables[];
}