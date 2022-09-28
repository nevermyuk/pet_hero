import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import UserDoesNotExistException from '../users/exceptions/userDoesNotExist.exception';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import ProfileAlreadyCreatedException from './exceptions/profileAlreadyCreated.exception';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    @InjectRepository(Profile) readonly profileRepository: Repository<Profile>,
  ) { }
  async create(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new UserDoesNotExistException();
    }
    if (user.profile !== null) {
      throw new ProfileAlreadyCreatedException();
    }
    const newProfile = this.profileRepository.create(createProfileDto);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    const userWithProfile = await this.userRepository.save(user);
    if (userWithProfile.profileId !== null) {
      return "Profile successfully created"
    } else {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.profileRepository.find();
  }

  async findOne(id: number) {
    return this.profileRepository.findOneByOrFail({ id });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update({ id }, { ...updateProfileDto });
  }

  async remove(id: number) {
    await this.profileRepository.findOneByOrFail({ id });
    return this.profileRepository.delete(id);
  }
}
