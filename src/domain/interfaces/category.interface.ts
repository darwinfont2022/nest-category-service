import { DeleteResult, UpdateResult } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";
import { ICategoryOption } from "../category-option";

export abstract class CategoryInterface {
    abstract save(categories: CategoryEntity[]): Promise<CategoryEntity[]>;
    abstract findAll(details?: ICategoryOption): Promise<CategoryEntity[]>;
    abstract findById(id: number): Promise<CategoryEntity>;
    abstract findByName(name: string, details?: ICategoryOption): Promise<CategoryEntity[]>;
    abstract findByIdOrName(id?: number, name?: string, details?: ICategoryOption): Promise<CategoryEntity>;
    abstract update(category: CategoryEntity): Promise<UpdateResult>;
    abstract delete(id: number): Promise<DeleteResult>
}