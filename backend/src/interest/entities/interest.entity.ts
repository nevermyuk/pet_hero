import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import InterestStatus from '../enums/interestStatus.enum';
import { Pet } from '../../pet/entities/pet.entity';

@Entity({ name: 'interests' })
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: InterestStatus,
  })
  status: InterestStatus;

  @ManyToOne(() => User, (user: User) => user.interests, { cascade: true })
  public user: User;

  @ManyToOne(() => Pet, (pet: Pet) => pet.interests, { cascade: true })
  public pet: Pet;
}
