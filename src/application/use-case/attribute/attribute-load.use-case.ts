import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AttributeEntity } from "../../../domain/entities/attribute.entity";
import { AttributeInterface } from "../../../domain/interfaces/attribute.interface";

@Injectable()
export class LoadAttribute {
    constructor(
        private readonly attributeRepository: AttributeInterface,
    ) { }

    async load(
        id: number,
        category: number,
        name: string,
    ): Promise<AttributeEntity | AttributeEntity[]> {
        if (id) {
            return this.loadById(id);
        }

        if (category && name) {
            return this.loadByCategoryIdAndName(category, name);
        } else if (name) {
            return this.loadByName(name)
        } else if (category) {
            return this.loadByCategory(category);
        }
    }
    async loadByCategoryIdAndName(category: number, name: string) {
        const attribute = await this.attributeRepository.findByCategoryIdAndName(category, name);

        if (!attribute) {
            throw new NotFoundException(`not found attribute whit name: '${name}' and category id: ${category}`)
        }

        return attribute;
    }

    loadRequiredByCategory(categoryId: number): Promise<AttributeEntity[]> {
        if (!categoryId) {
            throw new BadRequestException(`category id is required`);
        }

        return this.attributeRepository.findAttributesRequiredByCategory(categoryId);
    }

    async loadByCategory(category: number): Promise<AttributeEntity[]> {
        return this.attributeRepository.findByCategory(category);
    }

    async loadById(id: number): Promise<AttributeEntity> {
        const attribute: AttributeEntity = await this.attributeRepository.findById(id);
        if (!attribute) {
            throw new NotFoundException(`attribute ${id} not found.`);
        }

        return attribute;
    }

    async loadByName(name: string): Promise<AttributeEntity[]> {
        return await this.attributeRepository.findByName(name);
    }
}