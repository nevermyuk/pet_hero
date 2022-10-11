import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'User',
  STAFF = 'Staff',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.USER)
  .createOwn(['interests', 'profile'])
  .updateOwn('profile')
  .readAny(['profile'])
  .grant(AppRoles.STAFF)
  .createAny('pets')
  .updateAny(['pets', 'interests'])
  .deleteAny('pets')



