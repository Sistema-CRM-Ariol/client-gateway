import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateWarehouseDto {
    @IsString({ message: "El campo nombre el obligatorio" })
    name: string;

    @IsString({ message: "El campo dirección el obligatorio" })
    address: string;

    @IsOptional()
    @IsBoolean({ message: "Debe agregar un estado valido" })
    isActive?: boolean | undefined;
}
