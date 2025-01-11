import { DeleteResult, UpdateResult } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";

export interface CategoryInterface {
    save(categories: CategoryEntity[]): Promise<CategoryEntity[]>;
    findAll(details?: any): Promise<CategoryEntity[]>;
    findById(id: number, details?: any): Promise<CategoryEntity>;
    findByName(name: string, details?: any): Promise<CategoryEntity[]>;
    findByIdOrName(id?: number, name?: string, details?: any): Promise<CategoryEntity>;

    update(category: CategoryEntity): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>
}