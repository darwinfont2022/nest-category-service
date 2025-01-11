import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttributeEntity } from "./attribute.entity";
@Entity(
    'attribute_value'
)
export class ValueEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string;
    @Column()
    value: string;
    @ManyToOne(() => AttributeEntity, (a) => a.values, {
        onDelete: 'CASCADE'
    })
    attribute?: AttributeEntity;
}