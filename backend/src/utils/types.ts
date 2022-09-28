import { User } from '../users/entities/user.entity';

export type UserDetails = {
  email: string;
};

export type CreateUserParams = {
  email: string;
  password: string;
};

export type UpdateUserParams = {
  email: string;
  password: string;
};

export type Done = (err: Error, user: User) => void;
