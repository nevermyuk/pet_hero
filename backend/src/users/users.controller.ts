import {
  Body, Controller, Delete, Get, Inject, Logger, Param, Post, UseGuards
} from '@nestjs/common';
import { OTPGuard } from 'src/auth/utils/OTPGuard';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(OTPGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
