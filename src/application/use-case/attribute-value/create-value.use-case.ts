import { BadRequestException, Injectable } from "@nestjs/common";
import { AttributeValueReq } from "../../dto/req/attribute-value/attribute-value-req.dto";
import { AttributeValueMapper } from "../../mapper/attribute-value.mapper";
import { AttributeEntity } from "../../../domain/entities/attribute.entity";
import { ValueEntity } from "../../../domain/entities/value.entity";
import { IAttributeValue } from "../../../domain/interfaces/value.interface";
import { LoadAttribute } from "../attribute/attribute-load.use-case";
import { AttributeValueRes } from "src/application/dto/res/attribute-value-req";

@Injectable()
export class CreateAttributeValue {
    constructor(
        private readonly valueRepository: IAttributeValue,
        private readonly attributeUseCase: LoadAttribute,
    ) { }

    async createAll(values: AttributeValueReq[], attribbuteId: number): Promise<AttributeValueRes[]> {
        const attribbute = await this.attributeUseCase.loadById(attribbuteId);
        try {
            const valuesEntities = await this.valueRepository.saveAll(AttributeValueMapper.toEntities(values, attribbute));

            return valuesEntities.map(AttributeValueMapper.toDto);
        } catch {
            throw new BadRequestException('value name repeat')
        }
    }

    async saveEntity(value: ValueEntity): Promise<ValueEntity> {
        const existValue = await this.valueRepository.existByAttributeIdAndName(
            value.attribute.id,
            value.name
        )

        if (existValue) {
            return;
        }

        return this.valueRepository.save(value)
    }

    saveEntities(values: ValueEntity[]): Promise<ValueEntity[]> {
        return this.valueRepository.saveAll(values);
    }

    saveAll(values: AttributeValueReq[], attribbute: AttributeEntity = null): Promise<ValueEntity[]> {
        const entities = AttributeValueMapper.toEntities(values, attribbute)
        return this.valueRepository.saveAll(entities);
    }
}