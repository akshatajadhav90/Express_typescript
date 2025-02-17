import { Entity, Column, ManyToOne } from "typeorm";
import { Button } from "./buttons.entity";
import { Form } from "./forms.entity";
import { SubForm } from "./subForms.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class ButtonMapping extends BaseEntity {

    @ManyToOne(() => Button, (button) => button.mappings, { onDelete: "CASCADE" })
    button!: Button;

    @ManyToOne(() => Form, { nullable: true, onDelete: "CASCADE" })
    form!: Form;

    @ManyToOne(() => SubForm, { nullable: true, onDelete: "CASCADE" })
    subForm!: SubForm;

    // @Column({ type: "enum", enum: ["submit", "upload", "general"] })
    // type!: "submit" | "upload" | "general";

    // @Column({ type: "enum", enum: ["modal", "navigate"], nullable: true })
    // action!: "modal" | "navigate";

    @Column({ type: "varchar", length: 20 })
    type!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    action!: string;


    @ManyToOne(() => Form, { nullable: true, onDelete: "CASCADE" })
    nestedForm!: Form;

    @Column({ type: "text", default: "" })
    data!: string;
}
