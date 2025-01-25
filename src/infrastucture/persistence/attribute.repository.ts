import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AttributeEntity } from "../../domain/entities/attribute.entity";
import { AttributeInterface } from "../../domain/interfaces/attribute.interface";
import { UpdateResult, DeleteResult, Repository, Like } from "typeorm";

@Injectable()
export class AttributeRepository implements AttributeInterface {
    constructor(
        @InjectRepository(AttributeEntity)
        private readonly repository: Repository<AttributeEntity>
    ) { }

    findAttributesRequiredByCategory(categoryId: number): Promise<AttributeEntity[]> {
        return this.repository.createQueryBuilder('attribute')
            .select()
            .where('required = true')
            .andWhere('category = :categoryId', { categoryId })
            .execute()
    }

    findByCategory(categoryId: number): Promise<AttributeEntity[]> {
        return this.repository.createQueryBuilder('attribute')
            .where({ category: categoryId })
            .execute();
    }

    save(attribute: AttributeEntity): Promise<AttributeEntity> {
        return this.repository.save(attribute);
    }

    saveAll(attribute: AttributeEntity[]): Promise<AttributeEntity[]> {
        return this.repository.save(attribute);
    }

    findById(id: number): Promise<AttributeEntity> {
        return this.repository.findOne({
            where: { id },
            relations: {
                values: true
            }
        });
    }
    findByName(name: string): Promise<AttributeEntity[]> {
        return this.repository.find({
            where: {
                name: Like(`%${name}%`)
            }
        });
    }
    findByCategoryIdAndName(categoryId: number, name: string): Promise<AttributeEntity> {
        return this.repository.createQueryBuilder('atribute')
            .where({ name: name })
            .andWhere({ category: categoryId })
            .getOne()
    }

    existByCategoryIdAndName(id: number, name: string): Promise<boolean> {
        return this.repository.createQueryBuilder('attribute_exist')
            .where({
                name
            })
            .andWhere({ category: id })
            .getExists()
    }

    update(attribute: AttributeEntity): Promise<UpdateResult> {
        return this.repository.update(attribute.id, attribute);
    }
    delete(id: number): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }
}