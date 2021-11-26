import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Min } from 'class-validator';

export class UserRecoveryRequestDto {
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
}
