import {
  ValidateIf,
  IsNotEmpty,
  IsEmail,
  minLength,
  Min,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @Min(4)
  displayname: string;

  @IsNotEmpty()
  @IsEmail()
  @Min(4)
  email: string;

  @IsNotEmpty()
  @Min(4)
  password: string;
}
