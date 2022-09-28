import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  private readonly logger = new Logger(PetService.name);
  constructor(@InjectRepository(Pet) readonly petRepository: Repository<Pet>) { }
  create(createPetDto: CreatePetDto) {
    const newPet = this.petRepository.create({
      ...createPetDto,
      createdAt: new Date(),
    });
    return this.petRepository.save(newPet);
  }

  async findAll() {
    const pets = await this.petRepository.find()

    return pets.map(({ story, ...keepAttr }) => keepAttr);
  }

  findOne(id: number) {
    return this.petRepository.findOneBy({ id });
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return this.petRepository.update({ id }, { ...updatePetDto });
  }

  async remove(id: number) {
    await this.petRepository.findOneByOrFail({ id });
    return this.petRepository.delete(id);
  }
}
