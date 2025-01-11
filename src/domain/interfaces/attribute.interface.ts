import { DeleteResult, UpdateResult } from "typeorm";
import { AttributeEntity } from "../entities/attribute.entity";

export interface AttributeInterface {
    save(attributes: AttributeEntity[]): Promise<AttributeEntity[]>;
    findById(id: number): Promise<AttributeEntity>;
    findByName(name: string): Promise<AttributeEntity[]>;
    findByCategoryIdAndName(categoryId: number, name: string): Promise<AttributeEntity[]>;
    existByCategoryIdAndName(id: number, name: string): Promise<boolean>;

    update(attribute: AttributeEntity): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}