import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInterestDto } from './dto/create-interest.dto';
import { Interest } from './entities/interest.entity';
import { Pet } from '../pet/entities/pet.entity';
import InterestStatus from './enums/interestStatus.enum';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    readonly interestRepository: Repository<Interest>,
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(Pet) readonly petRepository: Repository<Pet>,
  ) {}

  async create(user: User, createInterestDto: CreateInterestDto) {
    const foundPet = await this.petRepository.findOneByOrFail({
      id: createInterestDto.pet_id,
    });
    if (foundPet) {
      const dateNow = new Date();
      const newInterest = this.interestRepository.create({
        user,
        status: InterestStatus.Received,
        pet: foundPet,
        createdAt: dateNow,
        updatedAt: dateNow,
      });
      return this.interestRepository.save(newInterest);
    } else {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.interestRepository.find({
      relations: {
        user: true,
        pet: true,
      },
    });
  }

  findOne(id: number) {
    return this.interestRepository.findOneOrFail({
      where: { id },
      relations: {
        user: true,
        pet: true,
      },
    });
  }

  async update(id: number) {
    const foundInterest = await this.interestRepository.findOneByOrFail({ id });
    switch (foundInterest.status) {
      case InterestStatus.Received:
        this.interestRepository.save({ id, status: InterestStatus.Processing });
        break;
      case InterestStatus.Processing:
        this.interestRepository.save({ id, status: InterestStatus.Completed });
        break;
      case InterestStatus.Completed:
        throw new BadRequestException('Interest has already been completed');
        break;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} interest`;
  }
}
