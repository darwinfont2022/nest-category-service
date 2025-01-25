import { DeleteResult, UpdateResult } from "typeorm";
import { ValueEntity } from "../entities/value.entity";

export abstract class IAttributeValue {
    abstract save(value: ValueEntity): Promise<ValueEntity>;
    abstract saveAll(values: ValueEntity[]): Promise<ValueEntity[]>;
    abstract findById(id: number): Promise<ValueEntity>;
    abstract findByName(name: string): Promise<ValueEntity[]>;
    abstract findByNames(names: string[]): Promise<ValueEntity[]>;
    abstract findByAttributeIdAndName(attributeId: number, name: string): Promise<ValueEntity>;
    abstract existByIdAndName(id: number, name: string): Promise<boolean>;
    abstract existByAttributeIdAndName(id: number, name: string): Promise<boolean>;

    abstract update(value: ValueEntity): Promise<UpdateResult>;
    abstract delete(id: number, neme: string): Promise<DeleteResult>;
}