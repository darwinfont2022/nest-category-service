import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValueEntity } from "../../domain/entities/value.entity";
import { IAttributeValue } from "../../domain/interfaces/value.interface";
import { UpdateResult, DeleteResult, Repository, Like, In } from "typeorm";

@Injectable()
export class AttributeValueRepositpry implements IAttributeValue {
    constructor(
        @InjectRepository(ValueEntity)
        private readonly repository: Repository<ValueEntity>
    ) { }

    findByNames(names: string[]): Promise<ValueEntity[]> {
        return this.repository.find({
            where: {
                name: In(names)
            }
        })
    }

    save(value: ValueEntity): Promise<ValueEntity> {
        return this.repository.save(value)
    }

    saveAll(values: ValueEntity[]): Promise<ValueEntity[]> {
        return this.repository.save(values);
    }

    findById(id: number): Promise<ValueEntity> {
        return this.repository.findOne({
            where: { id },
            relations: {
                attribute: true
            }
        })
    }

    findByName(name: string): Promise<ValueEntity[]> {
        return this.repository.find({
            where: {
                name: Like(`%${name}%`)
            }
        });
    }

    findByAttributeIdAndName(attributeId: number, name: string): Promise<ValueEntity> {
        return this.repository.createQueryBuilder('value')
            .where({ attribute: attributeId })
            .andWhere({ name: name })
            .getOne();
    }

    existByAttributeIdAndName(id: number, name: string): Promise<boolean> {
        return this.repository.createQueryBuilder('value')
            .where({ attribute: id })
            .andWhere({ name: name })
            .getExists();
    }

    existByIdAndName(id: number, name: string): Promise<boolean> {
        return this.repository.exists({
            where: {
                id,
                name
            }
        })
    }

    update(value: ValueEntity): Promise<UpdateResult> {
        return this.repository.createQueryBuilder('value')
            .update()
            .set({
                name: value.name,
                value: value.value
            })
            .where({ id: value.id })
            .execute();
    }

    delete(id: number, name: string): Promise<DeleteResult> {
        return this.repository.createQueryBuilder('value')
            .delete()
            .where({
                id,
                name,
            }).execute()
    }
}