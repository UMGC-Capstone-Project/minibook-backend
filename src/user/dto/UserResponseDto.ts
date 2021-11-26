import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  displayname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  avatarUrl?: string;
}
