import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { CategoryItemEntity } from "./item.entity";
import { AttributeEntity } from "./attribute.entity";

@Entity('category')
@Tree('closure-table')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column(
        {
            type: 'varchar',
            nullable: false,
            unique: true
        }
    )
    name: string;
    @TreeParent()
    parent?: CategoryEntity;
    @TreeChildren()
    children?: CategoryEntity[];
    @OneToMany(
        () => AttributeEntity,
        (a) => a.category,
        {
            cascade: true,
        }
    )
    attributes?: AttributeEntity[];
    @OneToMany(
        () => CategoryItemEntity,
        (i) => i.category,
        {
            cascade: true
        }
    )
    items?: CategoryItemEntity[]
}