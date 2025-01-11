import { DeleteResult, UpdateResult } from "typeorm";
import { ValueEntity } from "../entities/value.entity";

export interface ValueInterface {
    save(values: ValueEntity[]): Promise<ValueEntity[]>;
    findById(id: number): Promise<ValueEntity>;
    findByName(name: string): Promise<ValueEntity[]>;
    findByAttributeIdAndName(categoryId: number, name: string): Promise<ValueEntity[]>;
    existByAttributeIdAndName(id: number, name: string): Promise<boolean>;

    update(value: ValueEntity): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}