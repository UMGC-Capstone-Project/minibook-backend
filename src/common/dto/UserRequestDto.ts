import { IsEmail, IsNotEmpty } from "class-validator";

export class UserRequestDto {
    @IsNotEmpty()
    id: number;
    
    @IsNotEmpty()
    displayname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}