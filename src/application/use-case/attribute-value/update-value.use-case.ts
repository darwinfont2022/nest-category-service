import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AttributeValueReq } from "../../dto/req/attribute-value/attribute-value-req.dto";
import { ValueEntity } from "../../../domain/entities/value.entity";
import { IAttributeValue } from "../../../domain/interfaces/value.interface";

@Injectable()
export class UpdateAttributeValue {
    constructor(private readonly repository: IAttributeValue) {
    }

    async update(id: number, dto: AttributeValueReq) {
        const value = await this.repository.findById(id);

        if (!value) {
            throw new NotFoundException('attribute value not found');
        }

        value.name = dto.name;
        value.value = dto.value;

        try {
            await this.repository.update(value);
        } catch {
            throw new BadRequestException('ups algo salio mal')
        }
    }
}