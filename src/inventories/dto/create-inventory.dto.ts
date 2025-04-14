import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateInventoryDto {
    @IsString()
    productId: string;

    @IsString()
    warehouseId: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
