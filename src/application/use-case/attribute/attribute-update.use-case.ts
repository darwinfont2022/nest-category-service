import { Injectable, NotFoundException } from "@nestjs/common";
import { AttributeReq } from "../../dto/req/attribute-req.dto";
import { AttributeEntity } from "../../../domain/entities/attribute.entity";
import { AttributeInterface } from "../../../domain/interfaces/attribute.interface";

@Injectable()
export class UpdateAttribute {
    constructor(
        private readonly repository: AttributeInterface,
    ) { }

    async update(id: number, attributeDto: AttributeReq): Promise<AttributeEntity> {
        const attribute: AttributeEntity = await this.repository.findById(id);
        if (!attribute) {
            throw new NotFoundException('attribute not found')
        }

        attribute.name = attributeDto.name;
        attribute.fix = attributeDto.fix;
        attribute.required = attribute.required;

        return await this.repository.save(attribute);
    }
}