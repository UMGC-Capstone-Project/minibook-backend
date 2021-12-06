import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  displayname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsUrl()
  avatar?: string;

  firstname: string;

  lastname:string

}
