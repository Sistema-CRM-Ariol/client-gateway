import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString({ message: "Debe agregar un nombre correcto" })
    name: string;
  
    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsBoolean({ message: "Debe ser un valor booleano" })
    isActive?: boolean;
}
