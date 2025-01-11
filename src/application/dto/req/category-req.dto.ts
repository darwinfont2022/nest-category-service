import { IsOptional, Min, MinLength } from "class-validator";
import { AttributeReq } from "./attribute-req.dto";

export class CategoryReq {
    @MinLength(3)
    name: string;
    @IsOptional()
    @MinLength(1)
    attribute: AttributeReq[];
    @IsOptional()
    @Min(0)
    parentId?: number;
}