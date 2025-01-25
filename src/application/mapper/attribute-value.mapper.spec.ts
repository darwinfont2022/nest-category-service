import { ValueEntity } from "src/domain/entities/value.entity"
import { AttributeValueReq } from "../dto/req/attribute-value/attribute-value-req.dto"
import { AttributeValueMapper } from "./attribute-value.mapper"
import { AttributeValueRes } from "../dto/res/attribute-value-req"

describe('Attribute Value Mapper', () => {
    const value: AttributeValueReq = {
        name: 'name value 1',
        value: 'value 1',
    }

    it(`'toEntity' Should be name = 'name value 1', value = 'value 1' and attribute = null`, () => {
        const res: ValueEntity = AttributeValueMapper.toEntity(value);
        expect(res.name).toBe('name value 1');
        expect(res.value).toBe('value 1');
        expect(res.attribute).toBe(null);
    });

    it('toDto Should be name, value, id defined', () => {
        const entity: ValueEntity = AttributeValueMapper.toDto(value);
        entity.id = 1;
        const res: AttributeValueRes = AttributeValueMapper.toDto(entity);
        expect(res.name).toBe('name value 1');
        expect(res.value).toBe('value 1');
        expect(res.id).toBeDefined()
    });
})