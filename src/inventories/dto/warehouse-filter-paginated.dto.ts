import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class WarehouseFilterPaginatedDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsString()
    warehouseId: string;

    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string | undefined;

    @IsOptional()
    @Transform(({ value }) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    })
    @IsBoolean()
    isActive?: boolean;
}