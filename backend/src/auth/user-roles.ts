import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  User = 'User',
  Staff = 'Staff',
  Admin = 'Admin',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.User)
  .readOwn(['profile', 'user', 'interest'])
  .updateOwn('profile')
  .grant(UserRoles.Staff)
  .extend(UserRoles.User)
  .readAny('interest')
  .updateAny('interest')
  .createAny('pet')
  .updateAny('pet')
  .grant(UserRoles.Admin)
  .extend(UserRoles.Staff)
  .readAny(['profile', 'user'])
  .deleteAny(['profile', 'user']);
