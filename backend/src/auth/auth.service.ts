import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { UserDetails } from '../utils/types';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

import * as argon2 from 'argon2';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { EmailParams } from '../utils/types';
import LoginFailException from './exceptions/loginFail.exception';
import UserAlreadyExistException from './exceptions/userAlreadyExist.exception';
import UserDoesNotExistException from './exceptions/userDoesNotExist.exception';
import VerificationTokenPayload from './interface/verificationTokenPayload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('USER_SERVICE') private usersService: UsersService,
    @Inject('EMAIL_SERVICE') private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }
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
      this.logger.log(`${details.email} already exists.`);
      throw new UserAlreadyExistException();
    } else {
      return this.usersService.create(details);
    }
  }

  async findUser(id: number) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Welcome to the Pet Hero. To confirm the email address, click here: <a href="${url}">Verify Email</a>`;

    const mail: EmailParams = {
      to: email,
      subject: 'Welcome to Pet Hero. Verify your account now!🐶🐕‍🦺🐩🐕🐈🐱‍👤🐱‍🚀',
      html: `<h1>Pet Hero</h1>
      <p>${text}</p>
      <p>${url}</p>`,
    };
    return this.emailService.send(mail)
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }


  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl
    }
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  public isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    })
  }
}
