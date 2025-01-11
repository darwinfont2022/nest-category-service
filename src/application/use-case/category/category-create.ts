import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryReq } from "src/application/dto/req/category-req.dto";
import { CategoryRes } from "src/application/dto/res/category-res.dto";
import { CategoryMapper } from "src/application/mapper/category.mapper";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { CategoryInterface } from "src/domain/interfaces/category.interface";

@Injectable()
export class CategoryCreate {
    constructor(
        private readonly catergoryRepository: CategoryInterface,
    ) { }

    async create(categoryDTO: CategoryReq): Promise<CategoryEntity> {
        let parent: CategoryEntity = null;

        if (categoryDTO.parentId != undefined) {
            parent = await this.catergoryRepository.findById(categoryDTO.parentId);

            if (!parent) {
                throw new NotFoundException(`parent ${categoryDTO.parentId} not found`);
            }
        }

        const category: CategoryEntity = await this.catergoryRepository
            .save([CategoryMapper.toEntity(categoryDTO, parent)])[0];

        console.log(category);

        return category;
    }
}