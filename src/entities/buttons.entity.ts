import { Entity, Column, OneToMany } from "typeorm";
import { ButtonMapping } from "./buttonMapping.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Button extends BaseEntity {
    @Column()
    label!: string;

    @Column({ nullable: true })
    icon!: string;

    @OneToMany(() => ButtonMapping, (buttonMapping) => buttonMapping.button)
    mappings!: ButtonMapping[];
}
