import { CategoryEntity } from "src/domain/entities/category.entity";
import { CategoryReq } from "../dto/req/category-req.dto";
import { CategoryRes } from "../dto/res/category-res.dto";

export class CategoryMapper {
    public static toEntity(dto: CategoryReq, parent?: CategoryEntity): CategoryEntity {
        return {
            name: dto.name,
            parent
        }
    }

    public static toEntities(dtos: CategoryReq[], parent?: CategoryEntity): CategoryEntity[] {
        return dtos.map((dto) => this.toEntity(dto, parent))
    }

    public static toDto(entity: CategoryEntity): CategoryRes {
        return {
            id: entity.id,
            name: entity.name,
            parent: entity?.parent?.id !== undefined ? entity?.parent?.id : 'root',
            children: entity?.children ? entity.children.map((c) => this.toDto(c)) : []
        }
    }

    public static toDtos(entities: CategoryEntity[]): CategoryRes[] {
        return entities.map(this.toDto)
    }
}