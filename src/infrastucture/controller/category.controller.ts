import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoryQuery } from "src/application/dto/req/category-query.dto";
import { CategoryReq } from "src/application/dto/req/category-req.dto";
import { CategoryCreate } from "src/application/use-case/category/category-create";
import { CategoryDelete } from "src/application/use-case/category/category-delete.use-case";
import { CategoryLoad } from "src/application/use-case/category/category-load.use-case";
import { CategoryUpdate } from "src/application/use-case/category/category-update.use-case";

@Controller('/api/category')
export class CategoryController {
    constructor(
        private readonly createUse: CategoryCreate,
        private readonly loadUseCase: CategoryLoad,
        private readonly updateUseCase: CategoryUpdate,
        private readonly deleteUseCase: CategoryDelete
    ) {
    }

    @Post()
    create(@Body() categoryDto: CategoryReq) {
        return this.createUse.create(categoryDto);
    }

    @Get()
    load(@Query() query: CategoryQuery) {
        return this.loadUseCase.load(query);
    }

    @Put('/:id')
    updateCategory(@Param('id') id: number, @Body() categoryDto: CategoryReq) {
        return this.updateUseCase.update(id, categoryDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.deleteUseCase.delete(id)
    }
}