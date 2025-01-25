import { AttributeRes } from "./attribbute-res";

export interface CategoryRes {
    id?: number;
    name: string;
    parent?: number | 'root';
    children?: CategoryRes[];
    attributes?: AttributeRes[];
}