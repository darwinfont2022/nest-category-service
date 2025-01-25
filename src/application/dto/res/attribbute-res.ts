import { AttributeValueRes } from "./attribute-value-req";

export interface AttributeRes {
    id?: number;
    name: string;
    fix: boolean;
    fix_value?: string;
    required: boolean;
    values: AttributeValueRes[]
}