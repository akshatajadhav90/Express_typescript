import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from "typeorm";
  import { BaseEntity } from "./base.entity";
  import { SubForm } from "./subForms.entity";
  import { FormField } from "./formFields.entity";


  @Entity("formTables")
  export class FormTables extends BaseEntity {
    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    field_type!: string;

    @Column({ type: "varchar", length: 255 })
    type!: string;

    @Column({ type: "integer", nullable: false })
    is_required!: number;

    @Column({ type: "integer", nullable: false })
    is_editable!: number;

    @Column({ type: "integer", nullable: false })
    is_sort!: number;

    @Column({ type: "integer", nullable: false })
    order!: number;

    @Column({ type: "integer", nullable: false })
    colspan!: number;

    @Column({ type: "integer", nullable: false })
    rowspan!: number;

    @OneToMany(() => FormField, (formField) => formField.subForm, { cascade: true })
    formFields!: FormField[];

    @ManyToOne(() => SubForm, (subForm) => subForm.formFields, { onDelete: "CASCADE" })
    @JoinColumn({ name: "subFormId" }) // Specifies the foreign key column
    subForm!: SubForm;
  }