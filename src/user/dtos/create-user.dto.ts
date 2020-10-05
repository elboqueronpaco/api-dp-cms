import { IsAlphanumeric, IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string

    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    @IsAlphanumeric()
    userName: string

    
    @IsEmail()
    email: string

    @IsEmail()
    avatar: string

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string
}
