import { IsNotEmpty, IsEmail, Min } from "class-validator";

export class UserRecoverDto {
    @IsNotEmpty()
    @IsEmail()
    @Min(4)
    email: string;
}