import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserParams } from '../utils/types';
import { User } from './entities/user.entity';

import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) { }
  async create(userDetails: CreateUserParams) {

    const password = await argon2.hash(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createdAt: new Date(),
    });


    return this.userRepository.save(newUser);
  }

  async findAll() {
    return (await this.userRepository.find()).map((user) => plainToInstance(SerializedUser, user));
  }

  findOne(id: number) {
    return this.userRepository.findOneByOrFail({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }



  async remove(id: number) {
    await this.userRepository.findOneByOrFail({ id });
    return this.userRepository.delete({ id });
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.userRepository.update(userId, {
      twoFactorAuthenticationSecret: secret
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.userRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true
    });
  }

  async updatePassword(email: string, password: string) {
    const user = await this.findOneByEmail(email)
    if (!user) {
      throw new BadRequestException();
    }
    if (await argon2.verify(user.password, password)) {
      // password match
      throw new BadRequestException("Your new password cannot be the same as your old password");
    }
    const newPassword = await argon2.hash(password);

    return this.userRepository.update(user.id, {
      password: newPassword
    });
  }
}
