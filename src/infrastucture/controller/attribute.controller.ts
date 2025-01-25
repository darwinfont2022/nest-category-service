import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { AttributeReq } from "../../application/dto/req/attribute-req.dto";
import { CreateAttributeReq } from "../../application/dto/req/create-attribute-req.dto";
import { AttributeCreate } from "../../application/use-case/attribute/attribute-create.use-case";
import { LoadAttribute } from "../../application/use-case/attribute/attribute-load.use-case";
import { UpdateAttribute } from "../../application/use-case/attribute/attribute-update.use-case";

@Controller('/api/attribute')
export class AttributeController {
    constructor(
        private readonly createUseCase: AttributeCreate,
        private readonly loadUseCase: LoadAttribute,
        private readonly updateUseCase: UpdateAttribute,
    ) { }

    @Post()
    createAttribute(@Body() dto: CreateAttributeReq) {
        return this.createUseCase.createAll(dto);
    }

    @Get()
    loadById(
        @Query('id') id: number,
        @Query('category') category: number,
        @Query('name') name: string,
    ) {
        return this.loadUseCase.load(id, category, name);
    }

    @Get('/required')
    loadAttributesRequired(
        @Query('category') category: number,
    ) {
        return this.loadUseCase.loadRequiredByCategory(category);
    }

    @Put()
    update(@Query('id') id: number, @Body() dto: AttributeReq) {
        return this.updateUseCase.update(id, dto)
    }
}