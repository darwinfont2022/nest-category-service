import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ValueEntity } from "./value.entity";
import { CategoryEntity } from "./category.entity";
@Entity(
    'category_attribute'
)
export class AttributeEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string;
    @Column({
        type: "bool",
        default: false
    })
    fix: boolean;
    @Column({
        type: "bool",
        default: false
    })
    required: boolean;
    @ManyToOne(() => CategoryEntity, (c) => c.attributes)
    category: CategoryEntity;
    @OneToMany(() => ValueEntity, (v) => v.attribute, {
        cascade: true
    })
    values: ValueEntity[]
}