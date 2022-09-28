import { User } from '../../users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import Gender from '../enums/gender.enum';
import Property from '../enums/property.enum';

@Entity({ name: 'user_profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column()
  age: number;

  @Column()
  mobile: string;

  @Column()
  postalCode: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: Property,
  })
  residence_type: Property;

  @OneToOne(() => User, (user: User) => user.profile)
  public user: User;
}
