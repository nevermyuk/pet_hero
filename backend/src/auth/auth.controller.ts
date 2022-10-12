import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode, Inject,
  Logger, Param, Post, Req, Res, SerializeOptions, UnauthorizedException, UseGuards, UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sessionStore } from '../main';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import ForgotPasswordDto from './dto/forgotPassword.dto';
import ResetPasswordDto from './dto/resetPassword.dto';
import TwoFactorAuthenticationCodeDto from './dto/twoFactorAuthenticationCode.dto';
import LogoutFailException from './exceptions/logoutFail.exception';
import RequestWithUser from './interface/requestWithUser.interface';
import { AuthenticatedGuard } from './utils/Authenticated.guard';
import { LocalAuthGuard } from './utils/LocalAuth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthService,
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) { }

  @SerializeOptions({
    strategy: 'excludeAll'
  })
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
  async login(@Req() request: RequestWithUser) {
    // destroy all old sessions
    sessionStore.all(async (error, result) => {
      if (!error) {
        result.filter(sess =>
          sess.passport.user === request.user.id
        ).map(sess => {
          if (sess.id !== request.session.id) sessionStore.destroy(sess.id)
        })
      }
    })
    request.session.isSecondFactorAuthenticated = false
    return { 'otp': request.session.isSecondFactorAuthenticated }
  }

  @Get('logout')
  @HttpCode(200)
  async logOut(@Req() req: Request) {
    req.logout((err) => {
      if (err) {
        throw new LogoutFailException();
      }
    });
    req.session.cookie.maxAge = 0;
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.authService.sendResetLink(forgotPasswordDto.email)
    return { "msg": 'The reset password link is sent to your email.' };
  }

  // @Get('reset-password/:id')
  // async decodeForgotToken(@Param('id') id: number, @Body() resetPasswordDto: ResetPasswordDto) {
  //   const email = await this.authService.decodeResetToken(id, resetPasswordDto.token);
  //   return email;
  // }

  @Post('reset-password/:id')
  @HttpCode(200)
  async resetPassword(@Param('id') id: number, @Body() resetPasswordDto: ResetPasswordDto) {
    const email = await this.authService.decodeResetToken(id, resetPasswordDto.token);
    await this.usersService.updatePassword(email, resetPasswordDto.password)
    return { "msg": `Token is ${resetPasswordDto.token} Lets reset ${resetPasswordDto.password} 2nd: ${resetPasswordDto.confirmPassword}` };
  }


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
  @HttpCode(201)
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

  @SerializeOptions({
    strategy: 'excludeAll'
  })
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
    request.session.isSecondFactorAuthenticated = true
    return request.user;
  }


}
