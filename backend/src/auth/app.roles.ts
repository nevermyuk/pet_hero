import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER = 'User',
  STAFF = 'Staff',
}

export enum AppEntity {
  INTEREST = 'interests',
  PROFILE = 'profiles',
  PETS = 'pets',
}

export enum AppAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum AppPossession {
  OWN = 'own',
  ANY = 'any'
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.USER)
  .createOwn([AppEntity.INTEREST, AppEntity.PROFILE])
  .updateOwn(AppEntity.PROFILE)
  .readOwn([AppEntity.PROFILE])
  .readOwn([AppEntity.INTEREST])
  .grant(AppRoles.STAFF)
  .createAny(AppEntity.PETS)
  .updateAny([AppEntity.PETS, AppEntity.INTEREST])
  .readAny([AppEntity.INTEREST])
  .deleteAny(AppEntity.PETS)



