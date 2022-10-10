import {
  Body, Controller, Delete, Get, Inject,
  Logger, Param, Patch, Post, Request,
  UseGuards
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(AuthenticatedGuard)
@Controller('profiles')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(
    @Inject('PROFILE_SERVICE') private readonly profileService: ProfileService,
  ) { }

  @Post('create')
  create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    const id = req.user.id;
    return this.profileService.create(id, createProfileDto);
  }

  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'profile',
    action: 'read',
    possession: 'any',
  })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
