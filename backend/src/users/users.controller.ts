import { Controller, Get, Inject, Logger, Req, SerializeOptions, UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { OTPGuard } from '../auth/utils/OTPGuard';
import { UsersService } from './users.service';

@UseGuards(AuthenticatedGuard, OTPGuard)
@SerializeOptions({
  strategy: 'excludeAll'
})
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get('details')
  findOne(@Req() req: RequestWithUser) {
    return this.usersService.findOne(req.user.id);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
