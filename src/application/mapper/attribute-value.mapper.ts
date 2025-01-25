import { AttributeEntity } from "src/domain/entities/attribute.entity";
import { AttributeValueReq } from "../dto/req/attribute-value-req.dto";
import { ValueEntity } from "src/domain/entities/value.entity";
import { AttributeValueRes } from "../dto/res/attribute-value-req";

export class AttributeValueMapper {
    public static toEntity(dto: AttributeValueReq, attribute: AttributeEntity = null): ValueEntity {
        return {
            attribute,
            name: dto.name,
            value: dto.value
        };
    }

    public static toEntities(dtos: AttributeValueReq[], attribbute: AttributeEntity = null): ValueEntity[] {
        return dtos.map(dto => this.toEntity(dto, attribbute))
    }

    public static toDto(entity: ValueEntity): AttributeValueRes {
        return {
            id: entity.id,
            name: entity.name,
            value: entity.value
        }
    }

    public static toDtos(entities: ValueEntity[]): AttributeValueRes[] {
        return entities.map(this.toDto)
    }
}