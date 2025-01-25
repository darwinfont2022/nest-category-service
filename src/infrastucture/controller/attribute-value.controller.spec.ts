import { Test } from "@nestjs/testing"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AttributeEntity } from "../../domain/entities/attribute.entity"
import { CategoryEntity } from "../../domain/entities/category.entity"
import { ValueEntity } from "../../domain/entities/value.entity"
import { DataBaseConfig } from "../config/database-config"
import { AttributeValueController } from "./attribute-value.controller"
import { AttributeCreate } from "../../application/use-case/attribute/attribute-create.use-case"
import { LoadAttribute } from "../../application/use-case/attribute/attribute-load.use-case"
import { UpdateAttribute } from "../../application/use-case/attribute/attribute-update.use-case"
import { CategoryLoad } from "../../application/use-case/category/category-load.use-case"
import { CategoryInterface } from "../../domain/interfaces/category.interface"
import { AttributeInterface } from "../../domain/interfaces/attribute.interface"
import { IAttributeValue } from "../../domain/interfaces/value.interface"
import { AttributeRepository } from "../persistence/attribute.repository"
import { AttributeValueRepositpry } from "../persistence/value.repository"
import { CreateAttributeValue } from "../../application/use-case/attribute-value/create-value.use-case"

describe('Attribute Value Controller', () => {
    let controller: AttributeValueController;
    let createUseCase: CreateAttributeValue;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:
                [
                    TypeOrmModule.forRoot(DataBaseConfig.getDataBaseConfig()),
                    TypeOrmModule.forFeature([
                        CategoryEntity, AttributeEntity, ValueEntity
                    ])
                ],
            controllers: [AttributeValueController],
            providers: [
                AttributeCreate,
                LoadAttribute,
                UpdateAttribute,
                CategoryLoad,
                { provide: CategoryInterface, useClass: AttributeRepository },
                { provide: AttributeInterface, useClass: AttributeRepository },
                { provide: IAttributeValue, useClass: AttributeValueRepositpry },
                CreateAttributeValue,
            ]
        }).compile();

        controller = moduleRef.get(AttributeValueController);
        createUseCase = moduleRef.get(CreateAttributeValue)
    })
    describe('Save Values', () => {
        it('Should be call createUseCase -> createAll', () => {

        })
    })
})