import { AttributeReq } from "../dto/req/attribute-req.dto"
import { AttributeMapper } from "./attribute.mapper"

describe('Attribute Mapper', () => {
    const attributeReq: AttributeReq = {
        name: 'attribute 1',
        values: [
            {
                name: 'value name 1',
                value: 'value 1'
            }
        ],
        fix: true,
        fix_value: 'fix_value 1'
    }

    describe(`toEntity`, () => {
        it('should be has values empty', () => {
            const attribute = AttributeMapper.toEntity(attributeReq, null);
            expect(attribute.values.length).toBe(0)
        });

        it('should be values length 1', () => {
            const req: AttributeReq = {
                ...attributeReq,
                fix: false,
            }
            const attribute = AttributeMapper.toEntity(req, null);
            expect(attribute.values.length).toBe(1)
        })

        it('should be fix false, fix_value null', () => {
            const req: AttributeReq = {
                ...attributeReq,
                fix: true,
                fix_value: null,
            }
            const res = AttributeMapper.toEntity(req, null)
            expect(res.fix).toBe(false);
        })

        it('should be has fix false and fix_value null', () => {
            const req: AttributeReq = {
                ...attributeReq,
                fix: false,
                fix_value: 'fix_value 2'
            }
            const attribute = AttributeMapper.toEntity(req, null);
            expect(attribute.fix).toBe(false)
            expect(attribute.fix_value).toBe(null)
        });
    });

    describe(`toDto`, () => {
        it('to be should be undefined', () => {
            const res = AttributeMapper.toDto(null);
            expect(res).toBe(undefined)
        })

        it('to be defined', () => {
            const entity = AttributeMapper.toEntity(attributeReq);
            entity.id = 1;
            const res = AttributeMapper.toDto(entity);

            expect(res.id).toBe(1);
            expect(res.name).toBe(attributeReq.name);
            expect(res.fix).toBe(attributeReq.fix);
            expect(res.fix_value).toBe(attributeReq.fix_value);
        })
    })
})