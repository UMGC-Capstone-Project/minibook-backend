import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    readonly displayname: string;
    
    @IsNotEmpty()
    readonly password: string;
}