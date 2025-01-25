import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ValueEntity } from "./value.entity";
import { CategoryEntity } from "./category.entity";
@Entity(
    'category_attribute'
)
@Unique(['category', 'name'])
export class AttributeEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @PrimaryColumn()
    name: string;
    @Column({
        type: "bool",
        default: false
    })
    fix: boolean;
    @Column({
        type: 'varchar',
        length: 15,
        nullable: true,
    })
    fix_value?: string;
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