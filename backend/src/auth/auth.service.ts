import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDetails } from '../utils/types';

import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import LoginFailException from './exceptions/loginFail.exception';
import UserAlreadyExistException from './exceptions/userAlreadyExist.exception';
import UserDoesNotExistException from './exceptions/userDoesNotExist.exception';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('USER_SERVICE') private usersService: UsersService) { }
  async validateUserGoogle(details: UserDetails) {
    this.logger.debug({ details: details }, 'Validate user details');
    const user = await this.usersService.findOneByEmail(details.email);
    if (user) {
      this.logger.log('User found.');
      return user;
    } else {
      throw new UserDoesNotExistException();
    }
  }

  async validateUserLocal(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    try {
      if (await argon2.verify(user.password, pass)) {
        // password match
        const { password, ...result } = user;
        return result;
      } else {
        // password did not match
        throw new LoginFailException();
      }
    } catch (err) { }
    throw new LoginFailException();
  }

  async register(details: CreateUserDto) {
    this.logger.log('Creating user');
    const user = await this.usersService.findOneByEmail(details.email);
    if (user) {
      this.logger.log('User found.');
      throw new UserAlreadyExistException();
    } else {
      return this.usersService.create(details);
    }
  }

  async findUser(id: number) {
    const user = await this.usersService.findOne(id);
    return user;
  }
}
