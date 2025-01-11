import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { CategoryItemEntity } from "./item.entity";
import { AttributeEntity } from "./attribute.entity";

@Entity('category')
@Tree('closure-table')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string;
    @TreeParent()
    parent?: CategoryEntity;
    @TreeChildren()
    children?: CategoryEntity[];
    @OneToMany(() => AttributeEntity, (a) => a.category)
    attributes: AttributeEntity[];
    @OneToMany(() => CategoryItemEntity, (i) => i.category)
    items: CategoryItemEntity[]
}