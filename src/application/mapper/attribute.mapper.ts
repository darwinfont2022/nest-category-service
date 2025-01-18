import { AttributeEntity } from "src/domain/entities/attribute.entity";
import { AttributeReq } from "../dto/req/attribute-req.dto";
import { CategoryEntity } from "src/domain/entities/category.entity";
import { AttributeValueMapper } from "./attribute-value.mapper";
import { BadRequestException } from "@nestjs/common";

export class AttributeMapper {
    public static toEntity(dto: AttributeReq, category?: CategoryEntity): AttributeEntity {
        return {
            category,
            fix: (dto?.fix && dto?.fix_value) ? dto.fix : false,
            fix_value: this.validateFixValue(dto.fix, dto.fix_value),
            name: dto.name,
            values: (dto.fix === false) ? dto.values.map(v => {
                return {
                    name: v.name,
                    value: v.value,
                }
            }) : [],
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
}