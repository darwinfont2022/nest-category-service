import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { CreateAttributeValueReq } from "../../application/dto/req/attribute-value/create-value-req.dto";
import { CreateAttributeValue } from "../../application/use-case/attribute-value/create-value.use-case";
import { AttributeValueReq } from "../../application/dto/req/attribute-value/attribute-value-req.dto";
import { UpdateAttributeValue } from "../../application/use-case/attribute-value/update-value.use-case";
import { DeleteAttributeValue } from "../../application/use-case/attribute-value/delete-value.use-case";

@Controller('api/values')
export class AttributeValueController {
    constructor(
        private readonly createUseCase: CreateAttributeValue,
        private readonly updateUseCase: UpdateAttributeValue,
        private readonly deleteUseCase: DeleteAttributeValue,
    ) { }

    @Post()
    saveValues(@Body() dto: CreateAttributeValueReq) {
        return this.createUseCase.createAll(dto.values, dto.attribute);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: AttributeValueReq) {
        return this.updateUseCase.update(id, dto)
    }

    @Delete(':id')
    deleteValue(
        @Param('id') id: number
    ) {
        this.deleteUseCase.delete(id)
    }
}