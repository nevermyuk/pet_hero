import {
  BadRequestException, Body, Controller,
  Get, Inject, Param, Patch, Post, Request,
  UseGuards
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AppAction, AppEntity, AppPossession } from '../auth/app.roles';
import RequestWithUser from '../auth/interface/requestWithUser.interface';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { OTPGuard } from '../auth/utils/OTPGuard';
import { CreateInterestDto } from './dto/create-interest.dto';
import { InterestService } from './interest.service';

@UseGuards(AuthenticatedGuard, OTPGuard, ACGuard)
@Controller('interests')
export class InterestController {
  constructor(
    @Inject('INTEREST_SERVICE')
    private readonly interestService: InterestService,
  ) { }

  @UseRoles({
    resource: AppEntity.INTEREST,
    action: AppAction.CREATE,
    possession: AppPossession.ANY,
  })
  @Post('create')
  create(@Request() req: RequestWithUser, @Body() createInterestDto: CreateInterestDto) {
    const user = req.user;
    if (!user) {
      throw new BadRequestException();
    }
    return this.interestService.create(user, createInterestDto);
  }

  @UseRoles({
    resource: AppEntity.INTEREST,
    action: AppAction.READ,
    possession: AppPossession.ANY,
  })
  @Get()
  findAll() {
    return this.interestService.findAll();
  }

  @Get('user/:id')
  findUserInterests(@Param('id') id: number) {
    return this.interestService.findAll();
  }

  @UseRoles({
    resource: AppEntity.INTEREST,
    action: AppAction.READ,
    possession: AppPossession.ANY,
  })

  @Get(':id')
  findOne(@Param('id') id: number) {
    const interest = this.interestService.findOne(id);
    if (interest === null)
      throw new BadRequestException('Interest does not exist');

    return interest;
  }

  @UseRoles({
    resource: AppEntity.INTEREST,
    action: AppAction.UPDATE,
    possession: AppPossession.ANY,
  })
  @Patch(':id')
  update(@Param('id') id: number) {
    return this.interestService.update(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.interestService.remove(+id);
  // }
}
