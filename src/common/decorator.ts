import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserLoginRequestDto } from '../auth/dto/UserLoginRequestDto';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserLoginRequestDto;
  },
);
