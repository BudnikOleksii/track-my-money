import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDto } from '../dto/user.dto';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
