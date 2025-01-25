import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AttributeEntity } from "./attribute.entity";
@Entity(
    'attribute_value'
)
@Unique(['attribute', 'name'])
export class ValueEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @PrimaryColumn()
    name: string;
    @Column()
    value: string;
    @ManyToOne(() => AttributeEntity, (a) => a.values, {
        onDelete: 'CASCADE'
    })
    attribute?: AttributeEntity;
}