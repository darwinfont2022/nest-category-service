import { DeleteResult, UpdateResult } from "typeorm";
import { AttributeEntity } from "../entities/attribute.entity";

export abstract class AttributeInterface {
    abstract save(attribute: AttributeEntity): Promise<AttributeEntity>;
    abstract saveAll(attribbutes: AttributeEntity[]): Promise<AttributeEntity[]>;
    abstract findById(id: number): Promise<AttributeEntity>;
    abstract findByName(name: string): Promise<AttributeEntity[]>;
    abstract findByCategory(categoryId: number): Promise<AttributeEntity[]>;
    abstract findAttributesRequiredByCategory(categoryId: number): Promise<AttributeEntity[]>;
    abstract findByCategoryIdAndName(categoryId: number, name: string): Promise<AttributeEntity>;
    abstract existByCategoryIdAndName(id: number, name: string): Promise<boolean>;

    abstract update(attribute: AttributeEntity): Promise<UpdateResult>;
    abstract delete(id: number): Promise<DeleteResult>;
}