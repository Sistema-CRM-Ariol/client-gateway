import { IsString, IsNotEmpty, IsUUID, Min, IsNumber, IsOptional } from 'class-validator';

export class CreateImportItemDto {

    @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El campo productId es obligatorio' })
    productId: string;

    @IsString({ message: 'El nombre del producto debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    productName: string;

    @IsNumber({}, { message: 'La cantidad ordenada debe ser un número' })
    @Min(0, { message: 'La cantidad ordenada no puede ser negativa' })
    quantityOrdered: number;

    @IsNumber({}, { message: 'La cantidad recibida debe ser un número' })
    @Min(0, { message: 'La cantidad recibida no puede ser negativa' })
    @IsOptional()
    quantityReceived?: number | null | undefined;

    @IsNumber({}, { message: 'El precio unitario debe ser un número' })
    @Min(0, { message: 'El precio unitario no puede ser negativo' })
    priceUnit: number;

    @IsNotEmpty({ message: 'La moneda es obligatoria' })
    @IsString({ message: 'La moneda debe ser un texto' })
    currency?: string;
}
