import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryReq } from "src/application/dto/req/category-req.dto";
import { CategoryInterface } from "src/domain/interfaces/category.interface";

@Injectable()
export class CategoryDelete {
    constructor(
        private readonly repository: CategoryInterface,
    ) { }

    async delete(id: number) {
        return await this.repository.delete(id)
    }
}