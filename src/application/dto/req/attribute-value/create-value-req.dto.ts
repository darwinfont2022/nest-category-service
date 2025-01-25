import { AttributeValueReq } from "./attribute-value-req.dto";

export class CreateAttributeValueReq {
    attribute: number;
    values: AttributeValueReq[];
}