import { IsBoolean, IsOptional, Min, MinLength } from "class-validator";

export class CategoryQuery {
    @IsOptional()
    parent: boolean;
    @IsOptional()
    @MinLength(1)
    name: string;
    @IsOptional()
    category_id: number;
    @IsOptional()
    attributes?: boolean;
    @IsOptional()
    items?: boolean;
    @IsOptional()
    children: boolean;
}