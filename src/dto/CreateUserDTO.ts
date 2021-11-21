import { ValidateIf, IsNotEmpty, IsEmail, minLength, Min } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @Min(4)
    displayname: string;
    
    @IsNotEmpty()
    @Min(4)
    password: string;
    
    @IsNotEmpty()
    @IsEmail()
    @Min(4)
    email: string;
}