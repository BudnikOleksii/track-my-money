import { UserRole } from '../enums/user-role.enum';

export class UserEntity {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  country?: string;
  baseCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}
