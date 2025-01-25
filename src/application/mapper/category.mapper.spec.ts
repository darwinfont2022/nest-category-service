import { CategoryEntity } from "src/domain/entities/category.entity";
import { CategoryReq } from "../dto/req/category-req.dto";
import { CategoryMapper } from "./category.mapper"

describe('Category Mapper', () => {
    const req: CategoryReq = {
        name: 'category',
        attribute: [],
        parentId: null,
    }

    const categoryParent: CategoryEntity = {
        name: 'category Parent',
        id: 1,
    }
    it(`to be defined`, () => {
        const category = CategoryMapper.toEntity(null);
        expect(category).toBeUndefined()
    })

    it('shoud be return category name and parent undefined', () => {
        const category = CategoryMapper.toEntity(req);
        expect(category.name).toBe(req.name);
        expect(category.parent).toBeUndefined()
    })

    it('parent defined', () => {
        const category = CategoryMapper.toEntity(req, categoryParent);
        expect(category.parent).toBeDefined();
        expect(category.parent.name).toBe(categoryParent.name)
    })
})