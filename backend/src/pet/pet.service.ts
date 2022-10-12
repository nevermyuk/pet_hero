import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Span, TraceService } from 'nestjs-otel';
import { Repository } from 'typeorm';
import { runSeeder } from 'typeorm-extension';
import { AppDataSource } from '../db/data-source';
import { MainSeeder } from '../db/seeds/main.seed';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  private readonly logger = new Logger(PetService.name);
  constructor(@InjectRepository(Pet) readonly petRepository: Repository<Pet>, private readonly traceService: TraceService) {
    this.seed()
  }
  async seed() {
    const pets = await this.petRepository.find()
    if (pets.length === 0) {
      this.logger.log('No pets found... seeding database');
      await AppDataSource.initialize();
      await runSeeder(AppDataSource, MainSeeder);
    } else {
      this.logger.log(`${pets.length} Pets found!`);
    }
  }

  create(createPetDto: CreatePetDto) {
    const newPet = this.petRepository.create({
      ...createPetDto,
      createdAt: new Date(),
    });
    return this.petRepository.save(newPet);
  }

  @Span()
  async findAll() {
    const currentSpan = this.traceService.getSpan(); // --> retrives current span, comes from http or @Span
    const pets = await this.petRepository.find()
    currentSpan.addEvent('Retrieving pets');
    currentSpan.end()
    return pets.map(({ story, ...keepAttr }) => keepAttr);
  }

  async findOne(id: number) {
    return this.petRepository.findOneBy({ id });
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    await this.petRepository.findOneByOrFail({ id });
    return this.petRepository.update({ id }, { ...updatePetDto });
  }

  async remove(id: number) {
    await this.petRepository.findOneByOrFail({ id });
    return this.petRepository.delete(id);
  }
}
