import {
  Body, Controller, Delete, ForbiddenException, Get, Inject,
  Logger, Param, Patch, Post, Request,
  UseGuards
} from '@nestjs/common';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';
import { AppRoles } from '../auth/app.roles';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { OTPGuard } from '../auth/utils/OTPGuard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(AuthenticatedGuard, OTPGuard, ACGuard)
@Controller('profiles')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(
    @Inject('PROFILE_SERVICE') private readonly profileService: ProfileService,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder,
  ) { }

  @UseRoles({
    resource: 'profile',
    action: 'create',
    possession: 'any',
  })
  @Post('create')
  create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    const id = req.user.id;
    return this.profileService.create(id, createProfileDto);
  }

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
  findOne(@Request() req, @Param('id') id: number) {
    if (this.roleBuilder.can(AppRoles.USER).readOwn('profile').granted && req.user.profileId === id) {
      return this.profileService.findOne(id);
    } else {
      throw new ForbiddenException();
    }
  }

  @UseRoles({
    resource: 'profile',
    action: 'update',
    possession: 'own',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
