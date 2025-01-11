import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryReq } from "src/application/dto/req/category-req.dto";
import { CategoryInterface } from "src/domain/interfaces/category.interface";

@Injectable()
export class CategoryUpdate {
    constructor(
        private readonly repository: CategoryInterface,
    ) { }

    async update(id: number, categoryDTO: CategoryReq) {
        const category = await this.repository.findById(id);
        if (category == undefined) {
            throw new NotFoundException("category not found")
        }

        category.name = categoryDTO.name

        await this.repository.update(category)
    }
}