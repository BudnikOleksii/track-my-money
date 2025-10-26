import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '@track-my-money/api-shared';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    
return request.user;
  },
);
