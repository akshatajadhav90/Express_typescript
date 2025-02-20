import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { BaseEntity } from "./base.entity";
  import { SubForm } from "./subForms.entity"; 
  import {FormField} from "./formFields.entity"

  @Entity({name:"formFieldsOptions"})
  export class FormFieldsOptions extends BaseEntity{

    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @ManyToOne(() => FormField, (formField) => formField.formFieldOptions, { onDelete: "CASCADE" })
   @JoinColumn({ name: "formFieldId" }) // Foreign key column
  formField!: FormField;

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
  }