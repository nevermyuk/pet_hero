import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode, Inject,
  Logger,
  Post,
  Req, Res, UnauthorizedException, UseGuards, UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import TwoFactorAuthenticationCodeDto from './dto/twoFactorAuthenticationCode.dto';
import LogoutFailException from './exceptions/logoutFail.exception';
import RequestWithUser from './interface/requestWithUser.interface';
import { AuthenticatedGuard } from './utils/AuthenticatedGuard';
import { LocalAuthGuard } from './utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthService,
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) { }

  @Post('register')
  @HttpCode(204)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    await this.authService.sendVerificationLink(createUserDto.email);
    return user
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req) {
    req.session.isSecondFactorAuthenticated = false
    return req.user
  }

  // @Get('google/login')
  // @UseGuards(GoogleAuthGuard)
  // handleLogin() {
  //   return { msg: 'Google Authentication' };
  // }

  @Get('logout')
  async logOut(@Req() req: Request) {
    req.logout((err) => {
      if (err) {
        throw new LogoutFailException();
      }
    });
    req.session.cookie.maxAge = 0;
  }

  // api/auth/google/redirect
  // @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  // handleRedirect(@Res() res) {
  //   return res.redirect('http://localhost:3000');
  // }

  @Get('status')
  user(@Req() request: Request) {
    this.logger.log({ user: request.user }, 'Get Auth Status');
    if (request.user) {
      return { msg: 'Authenticated', user: { ...request.user } };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('confirm-email')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.authService.decodeConfirmationToken(confirmationData.token);
    await this.authService.confirmEmail(email);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.authService.resendConfirmationLink(request.user.id);
  }

  @Post('2fa-generate')
  @UseGuards(AuthenticatedGuard)
  async generateMFA(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } = await this.authService.generateTwoFactorAuthenticationSecret(request.user);
    return this.authService.pipeQrCodeStream(response, otpauthUrl);
  }


  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
  }

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(AuthenticatedGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    console.log(request.session.isSecondFactorAuthenticated)
    request.session.isSecondFactorAuthenticated = true
    return request.user;
  }


}
