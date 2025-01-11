import { Injectable } from "@nestjs/common";
import { CategoryQuery } from "src/application/dto/req/category-query.dto";
import { CategoryRes } from "src/application/dto/res/category-res.dto";
import { CategoryMapper } from "src/application/mapper/category.mapper";
import { ICategoryOption } from "src/domain/category-option";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { CategoryInterface } from "src/domain/interfaces/category.interface";

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
}