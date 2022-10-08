import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserParams, EmailParams } from '../utils/types';
import { User } from './entities/user.entity';

import { plainToInstance } from 'class-transformer';
import { EmailService } from '../email/email.service';
import { SerializedUser } from './types';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @Inject('EMAIL_SERVICE') private readonly emailService: EmailService,
  ) { }
  async create(userDetails: CreateUserParams) {

    const password = await argon2.hash(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
      createdAt: new Date(),
    });

    const mail: EmailParams = {
      to: newUser.email,
      subject: 'Welcome to Pet Hero. Verify your account now!🐶🐕‍🦺🐩🐕🐈🐱‍👤🐱‍🚀',
      html: '<h1>Pet Hero</h1><p>Thank you for registrating. Please click here to verify</p>',
    };

    this.emailService.send(mail)
    await this.userRepository.save(newUser);
    return true
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

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number) {
    await this.userRepository.findOneByOrFail({ id });
    return this.userRepository.delete({ id });
  }
}
