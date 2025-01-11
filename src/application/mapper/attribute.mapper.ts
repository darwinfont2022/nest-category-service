import { AttributeEntity } from "src/domain/entities/attribute.entity";
import { AttributeReq } from "../dto/req/attribute-req.dto";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { AttributeValueMapper } from "./attribute-value.mapper";

export class AttributeMapper {
    public static toEntity(dto: AttributeReq, category: CategoryEntity): AttributeEntity {
        return {
            name: dto.name,
            fix: dto.fix,
            required: dto.required,
            category: category,
            values: null
        }
    }

    public static toEntities(dtos: AttributeReq[], category: CategoryEntity): AttributeEntity[] {
        return dtos.map((dto) => this.toEntity(dto, category));
    }
}