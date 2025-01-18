import { AttributeEntity } from "src/domain/entities/attribute.entity";
import { AttributeValueReq } from "../dto/req/attribute-value-req.dto";
import { ValueEntity } from "src/domain/entities/value.entity";

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
}