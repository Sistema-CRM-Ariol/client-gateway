import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class InventoryAdjustmentDto {
    
    @IsNotEmpty({message: 'El ID del producto es obligatorio'})
    @IsUUID('4', {message: 'El ID del producto debe ser un UUID válido'})
    productId: string;

    @IsNotEmpty({message: 'El código del producto es obligatorio'})
    @IsString({message: 'El código del producto debe ser una cadena de texto'})
    productCode: string;

    @IsNotEmpty({message: 'El nombre del producto es obligatorio'})
    @IsString({message: 'El nombre del producto debe ser una cadena de texto'})
    productName: string;


    @IsNotEmpty({message: 'El ID del almacén es obligatorio'})
    @IsUUID('4', {message: 'El ID del almacén debe ser un UUID válido'})
    warehouseId: string;

    @IsNotEmpty({message: 'El nombre del almacén es obligatorio'})
    @IsString({message: 'El nombre del almacén debe ser una cadena de texto'})
    warehouseName: string;

    @IsNumber({}, {message: 'La cantidad debe ser un número'})
    quantity: number;

    @IsOptional()
    @IsString({message: 'Las notas deben ser una cadena de texto'})
    notes?: string;
}