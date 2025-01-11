import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
@Entity(
    'category_item'
)
export class CategoryItemEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    reference: string;
    @ManyToOne(() => CategoryEntity, (c) => c.items)
    category: CategoryEntity
}