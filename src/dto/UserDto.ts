import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    displayname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}