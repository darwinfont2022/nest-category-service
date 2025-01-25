import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryOption } from "../../domain/category-option";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { UpdateResult, DeleteResult, Repository, Or, TreeRepository, Like } from "typeorm";

@Injectable()
export class CategoryRepository implements CategoryInterface {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: TreeRepository<CategoryEntity>
    ) { }

    save(categories: CategoryEntity[]): Promise<CategoryEntity[]> {
        return this.repository.save(categories);
    }

    findAll(details?: any): Promise<CategoryEntity[]> {
        return this.repository.findTrees();
    }

    async findById(id: number): Promise<CategoryEntity> {
        return this.repository.findOne({
            where: { id },
            relations: {
                parent: true,
                attributes: true,
                items: true,
                children: true
            }
        })
    }

    findByName(name: string): Promise<CategoryEntity[]> {
        return this.repository.find({
            where: { name: Like(`%${name}%`) },
            relations: {
                parent: true,
                attributes: true,
                items: true,
                children: true
            }
        })
    }

    findByIdOrName(id?: number, name?: string, details?: any): Promise<CategoryEntity> {
        if (id) {
            return this.repository.findOne(
                {
                    where: { id },
                    relations: {
                        parent: true,
                        attributes: true,
                        items: true,
                        children: true
                    }
                }
            )
        }

        return this.repository.findOne({
            where: { name },
            relations: {
                parent: true,
                attributes: true,
                items: true,
                children: true
            }
        })
    }

    update(category: CategoryEntity): Promise<UpdateResult> {
        const queryBuilder = this.repository.createQueryBuilder('category_update');
        return queryBuilder.update(CategoryEntity)
            .set({
                name: category.name,
                parent: category.parent
            })
            .where({
                id: category.id
            })
            .execute()
    }

    delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}