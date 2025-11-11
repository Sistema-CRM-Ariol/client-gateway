import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateLeadDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    lastname?: string | null | undefined;   
    
    @IsString()
    @IsOptional()
    position?: string | null | undefined;
    
    @IsString()
    city: string;
    
    @IsString()
    @IsOptional()
    address?: string | null | undefined;
    
    @IsString()
    @IsOptional()
    razonSocial?: string | null | undefined;
    
    @IsString()
    @IsOptional()
    nit?: string | null | undefined;
    
    @IsEmail()
    email1: string;
    
    @IsEmail()
    @IsOptional()
    email2?: string | null | undefined;
    
    @IsString()
    phone1: string;
    
    @IsString()
    @IsOptional()
    phone2?: string | null | undefined;

    @IsOptional()
    @IsString()
    source: string | undefined;
    
    @IsOptional()
    @IsString()
    status: string | undefined;
    
    @IsOptional()
    @IsString()
    priority: string | undefined;
    
    @IsString()
    @IsOptional()
    description?: string | null | undefined;
    
    @IsString()
    @IsOptional()
    notes?: string | null | undefined;

    @IsString()
    @IsOptional()
    assignedToId?: string | null | undefined;

    @IsString()
    @IsOptional()
    clientId?: string | null | undefined;
    
    @IsBoolean()
    @IsOptional()
    isActive?: boolean | undefined;
}
