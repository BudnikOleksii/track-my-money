import { User } from '@track-my-money/database';

export type UserEntity = Omit<User, 'password' | 'ipAddress'>;
