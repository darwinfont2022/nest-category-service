import { DeleteResult, UpdateResult } from "typeorm";
import { CategoryItemEntity } from "../entities/item.entity";

export interface CategoryItemInterface {
    save(attributes: CategoryItemEntity[]): Promise<CategoryItemEntity[]>;
    findById(id: number): Promise<CategoryItemEntity>;
    findByName(name: string): Promise<CategoryItemEntity[]>;
    findByCategoryIdAndReference(categoryId: number, name: string): Promise<CategoryItemEntity[]>;
    existByCategoryIdAndReference(id: number, name: string): Promise<boolean>;
    update(attribute: CategoryItemEntity): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}