import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
    
    @IsString({ message: "El campo cargo es obligatorio" })
    cargo: string;

    @IsString({ message: "El campo departamento es obligatorio" })
    departamento: string;
    
    @IsString({ message: "El campo direccion es obligatorio" })
    direccion: string;

    @IsString({ message: "El campo nombre de factura es obligatorio" })
    factura: string;
    
    @IsString({ message: "El campo NIT es obligatorio" })
    nit: string

    @IsString({ message: "El campo nombre es obligatorio" })
    nombre: string
    
    @IsString({ message: "El campo provincia es obligatorio" })
    provincia: string
    
    @IsOptional()
    @IsArray()
    correos?: string[];

    @IsOptional()
    @IsString()
    empresaId?: string;

    @IsOptional()
    @IsArray()
    telefonos?: string[];

}
