import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Interest } from '../../interest/entities/interest.entity';
import AdoptionStatus from '../enums/adoptionStatus.enum';
import PetGender from '../enums/petGender.enum';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column({
    type: 'enum',
    enum: PetGender,
  })
  gender: PetGender;

  @Column()
  age: number;

  @Column()
  hdb_approved: boolean;

  @Column()
  sterilized: boolean;

  @Column()
  vaccinated: boolean;

  @Column()
  microchipped: boolean;

  @Column({
    type: 'enum',
    enum: AdoptionStatus,
  })
  status: AdoptionStatus;

  @Column()
  story: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Interest, (interest: Interest) => interest.pet)
  public interests: Interest[];
}
