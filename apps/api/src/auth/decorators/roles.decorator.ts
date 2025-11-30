import { SetMetadata } from '@nestjs/common';

import { UserRole } from '@track-my-money/database';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
