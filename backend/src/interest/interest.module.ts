import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { Interest } from './entities/interest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../pet/entities/pet.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, User, Pet])],
  controllers: [InterestController],
  providers: [{ provide: 'INTEREST_SERVICE', useClass: InterestService }],
})
export class InterestModule {}
