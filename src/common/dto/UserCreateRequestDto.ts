import { ApiProperty } from '@nestjs/swagger';
import {
  ValidateIf,
  IsNotEmpty,
  IsEmail,
  minLength,
  Min,
} from 'class-validator';

export class UserCreateRequestDto {
  @IsNotEmpty()
  @Min(4)
  @ApiProperty({
    description: 'The display name for the user',
    type: String,
    minimum: 4,
    default: 'JohnDoe',
  })
  displayname: string;

  @IsNotEmpty()
  @IsEmail()
  @Min(4)
  @ApiProperty({
    description: 'The email for the user',
    type: String,
    minimum: 4,
    default: 'johndoe@miniboo.io',
  })
  email: string;

  @IsNotEmpty()
  @Min(4)
  @ApiProperty({
    description: 'The email for the user',
    type: String,
    minimum: 4,
    default: '#@jMpXQ^%Sb8M3',
  })
  password: string;
}
