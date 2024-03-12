import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetController],
  providers: [{ provide: 'PET_SERVICE', useClass: PetService }],
})
export class PetModule { }
