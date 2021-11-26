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
  avatarUrl?: string;
}
