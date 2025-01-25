import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryQuery } from "../../dto/req/category-query.dto";
import { CategoryRes } from "../../dto/res/category-res.dto";
import { ICategoryOption } from "../../../domain/category-option";
import { CategoryEntity } from "../../../domain/entities/category.entity";
import { CategoryInterface } from "../../../domain/interfaces/category.interface";

@Injectable()
export class CategoryLoad {
    constructor(
        private readonly categoryRepository: CategoryInterface,
    ) { }

    async load(queries: CategoryQuery) {
        if (queries.category_id !== undefined) {
            return await this.categoryRepository.findById(queries.category_id)
        } else if (queries.name) {
            return this.categoryRepository.findByName(queries.name)
        }

        return await this.categoryRepository.findAll();
    }

    async loadById(id: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findById(id);
        if (category === undefined) {
            throw new NotFoundException(`category id ${id} not found`);
        }

        return category;
    }
}