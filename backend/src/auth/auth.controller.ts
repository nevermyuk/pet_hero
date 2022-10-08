import {
  Body,
  Controller,
  Get, HttpCode, HttpException, HttpStatus, Inject,
  Logger,
  Post,
  Req, UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import LogoutFailException from './exceptions/logoutFail.exception';
import { LocalAuthGuard } from './utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) { }

  @Post('register')
  @HttpCode(204)
  async register(@Body() createUserDto: CreateUserDto) {
    const registration = this.authService.register(createUserDto);
    if (registration) {
      return "Successfully registered."
    } else {
      throw new HttpException('Something bad happened..', HttpStatus.REQUEST_TIMEOUT)
    }
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req) {
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
}
