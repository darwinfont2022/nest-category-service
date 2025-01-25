import { AttributeEntity } from "src/domain/entities/attribute.entity";
import { AttributeReq } from "../dto/req/attribute-req.dto";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { AttributeValueMapper } from "./attribute-value.mapper";
import { BadRequestException } from "@nestjs/common";
import { AttributeRes } from "../dto/res/attribbute-res";

export class AttributeMapper {
    public static toEntity(dto: AttributeReq, category?: CategoryEntity): AttributeEntity {
        if (!dto) {
            return;
        }
        return {
            category,
            fix: (dto?.fix && dto?.fix_value) ? dto.fix : false,
            fix_value: this.validateFixValue(dto.fix, dto.fix_value),
            name: dto.name,
            values: (dto.fix === false) ? AttributeValueMapper.toEntities(dto.values) : [],
            required: dto.required
        }
    }

    public static validateFixValue(fix: boolean, value: string) {
        if (fix && !value) {
            return null;
        } else if (!fix) {
            return null;
        } else if (fix && value) {
            return value;
        }
    }

    public static toEntities(dtos: AttributeReq[], category?: CategoryEntity): AttributeEntity[] {
        return dtos.map((dto) => this.toEntity(dto, category));
    }

    public static toDto(entity: AttributeEntity): AttributeRes {
        if (!entity) {
            return;
        }

        return {
            id: entity.id,
            name: entity.name,
            fix: entity.fix,
            fix_value: entity.fix_value,
            required: entity.required,
            values: entity?.values ? AttributeValueMapper.toDtos(entity.values) : [],
        }
    }

    public static toDtos(entities: AttributeEntity[]): AttributeRes[] {
        return entities.map(this.toDto)
    }
}