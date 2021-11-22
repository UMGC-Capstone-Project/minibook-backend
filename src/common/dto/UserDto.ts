import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    
    @IsNotEmpty()
    id?: number;
    
    @IsNotEmpty()
    displayname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}