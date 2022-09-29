import {
  BadRequestException, Body, Controller,
  Get, Inject, Param, Patch, Post, Request,
  UseGuards
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/utils/AuthenticatedGuard';
import { CreateInterestDto } from './dto/create-interest.dto';
import { InterestService } from './interest.service';

@Controller('interests')
export class InterestController {
  constructor(
    @Inject('INTEREST_SERVICE')
    private readonly interestService: InterestService,
  ) { }

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Request() req, @Body() createInterestDto: CreateInterestDto) {
    const user = req.user;
    if (!user) {
      throw new BadRequestException();
    }
    return this.interestService.create(user, createInterestDto);
  }

  @Get()
  findAll() {
    return this.interestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const interest = this.interestService.findOne(+id);
    if (interest === null)
      throw new BadRequestException('Interest does not exist');

    return interest;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.interestService.update(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.interestService.remove(+id);
  // }
}
