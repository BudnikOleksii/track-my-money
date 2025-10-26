import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@track-my-money/api-shared';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
