import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { CreateAttributeReq } from "../../dto/req/create-attribute-req.dto";
import { AttributeEntity } from "../../../domain/entities/attribute.entity";
import { AttributeInterface } from "../../../domain/interfaces/attribute.interface";
import { CategoryLoad } from "../category/category-load.use-case";
import { AttributeRes } from "../../dto/res/attribbute-res";
import { CreateAttributeValue } from "../attribute-value/create-value.use-case";
import { DataSource } from "typeorm";
import { AttributeMapper } from "../../mapper/attribute.mapper";
import { AttributeValueMapper } from "../../mapper/attribute-value.mapper";

@Injectable()
export class AttributeCreate {
    constructor(
        private readonly attributeRepository: AttributeInterface,
        private readonly categoryLoad: CategoryLoad,
        private readonly valueCreate: CreateAttributeValue,
        private readonly dateSoruce: DataSource,
    ) { }

    async createAll(reqDto: CreateAttributeReq): Promise<AttributeRes[]> {
        const category = await this.categoryLoad.loadById(reqDto.category);

        let attributes: AttributeEntity[] = AttributeMapper.toEntities(reqDto.attributes, category);

        try {
            return AttributeMapper.toDtos(await this.attributeRepository.saveAll(attributes))
        } catch {
            throw new BadGatewayException('Attributes or values repeat');
        }
    }
}