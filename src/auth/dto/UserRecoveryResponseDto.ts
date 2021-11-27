import { ApiProperty } from '@nestjs/swagger';

export class UserRecoveryResponseDto {
  @ApiProperty({
    type: Boolean,
  })
  successful: boolean;
}
