import { AttributeController } from "./attribute.controller";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttributeRes } from "../../application/dto/res/attribbute-res";
import { CreateAttributeReq } from "src/application/dto/req/create-attribute-req.dto";
import { AttributeCreate } from "../../application/use-case/attribute/attribute-create.use-case";
import { AttributeReq } from "../../application/dto/req/attribute-req.dto";
import { DataBaseConfig } from "../config/database-config";
import { CategoryEntity } from "../../domain/entities/category.entity";
import { AttributeEntity } from "../../domain/entities/attribute.entity";
import { ValueEntity } from "../../domain/entities/value.entity";
import { CategoryLoad } from "../../application/use-case/category/category-load.use-case";
import { AttributeInterface } from "../../domain/interfaces/attribute.interface";
import { AttributeRepository } from "../persistence/attribute.repository";
import { CategoryInterface } from "../../domain/interfaces/category.interface";
import { LoadAttribute } from "../../application/use-case/attribute/attribute-load.use-case";
import { UpdateAttribute } from "../../application/use-case/attribute/attribute-update.use-case";
import { CreateAttributeValue } from "../../application/use-case/attribute-value/create-value.use-case";
import { IAttributeValue } from "../../domain/interfaces/value.interface";
import { AttributeValueRepositpry } from "../persistence/value.repository";

describe('Attribute Controller', () => {
    let contrller: AttributeController;
    let createUseCase: AttributeCreate;
    let categoryLoad: CategoryLoad;

    const attributeReq: AttributeReq = {
        name: 'attribute 1',
        fix: false,
        required: true,
        values: [],
    };

    const attributeRes: AttributeRes = {
        id: 1,
        name: 'attribute 1',
        fix: false,
        required: true,
        values: []
    };

    const createReq: CreateAttributeReq = {
        category: 1,
        attributes: [attributeReq]
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:
                [
                    TypeOrmModule.forRoot(DataBaseConfig.getDataBaseConfig()),
                    TypeOrmModule.forFeature([
                        CategoryEntity, AttributeEntity, ValueEntity
                    ])
                ],
            controllers: [AttributeController],
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
        }).compile()

        contrller = moduleRef.get(AttributeController);
        createUseCase = moduleRef.get(AttributeCreate);
        categoryLoad = moduleRef.get(CategoryLoad);
    })

    describe('create-attribute', () => {
        it('create attributes', async () => {
            jest.spyOn(createUseCase, 'createAll')
                .mockImplementation(async (createReq) => Promise.resolve([attributeRes]));

            expect(await createUseCase.createAll(createReq)).toStrictEqual([attributeRes])
        })
    })
});