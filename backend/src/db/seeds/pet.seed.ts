import { Pet } from '../../pet/entities/pet.entity';
import { faker } from '@faker-js/faker';
import PetGender from '../../pet/enums/petGender.enum';
import AdoptionStatus from '../../pet/enums/adoptionStatus.enum';

import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import axios from 'axios';

export class PetSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const petRepository = dataSource.getRepository(Pet);
    for (let i = 0; i <= 100; i++) {
      const newPet = new Pet();
      newPet.name = faker.name.firstName();
      newPet.species = i < 50 ? 'Cat' : 'Dog';
      const res = await axios.get('https://dog.ceo/api/breeds/image/random');
      const imageUri = res.data.message;

      newPet.imageUrl = imageUri;
      newPet.breed = i < 50 ? faker.animal.cat() : faker.animal.dog();
      newPet.gender = i % 2 == 0 ? PetGender.Male : PetGender.Female;
      newPet.age = faker.datatype.number({
        min: 1,
        max: 15,
      });
      newPet.hdb_approved = i % 2 == 0 ? true : false;
      newPet.sterilized = i % 2 == 0 ? true : false;
      newPet.vaccinated = i % 2 == 0 ? true : false;
      newPet.microchipped = i % 2 == 0 ? true : false;
      newPet.status =
        i % 2 == 0
          ? AdoptionStatus.For_Adoption
          : AdoptionStatus.Pending_Adoption;
      newPet.status =
        i % 10 == 0 ? AdoptionStatus.Adopted : AdoptionStatus.For_Adoption;
      newPet.story = faker.lorem.text();
      newPet.createdAt = new Date();
      const savePet = petRepository.create(newPet);
      await petRepository.save(savePet);
    }
  }
}
