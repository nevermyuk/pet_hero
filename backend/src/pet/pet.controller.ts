import {
  Body, Controller, Delete, Get, Inject,
  Logger, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppAction, AppEntity, AppPossession } from '../auth/app.roles';
import { AuthenticatedGuard } from '../auth/utils/Authenticated.guard';
import { OTPGuard } from '../auth/utils/OTP.guard';
import { ThrottlerBehindProxyGuard } from '../utils/ThrottlerBehindProxy.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@Controller('pets')
export class PetController {
  private readonly logger = new Logger(PetController.name);
  constructor(@Inject('PET_SERVICE') private readonly petService: PetService) { }

  @UseGuards(AuthenticatedGuard, OTPGuard, ACGuard)
  @UseRoles({
    resource: AppEntity.PETS,
    action: AppAction.CREATE,
    possession: AppPossession.ANY,
  })
  @Post('create')
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }
  // How to throttle
  @UseGuards(ThrottlerBehindProxyGuard)
  @Throttle(5, 30)
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petService.remove(id);
  }
}
