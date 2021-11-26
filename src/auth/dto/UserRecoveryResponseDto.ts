import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Min } from 'class-validator';

export class UserRecoveryResponseDto {
  @ApiProperty({
    type: Boolean,
  })
  successful: boolean;
}
