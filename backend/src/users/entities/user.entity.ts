import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { AppRoles } from '../../auth/app.roles';
import { Interest } from '../../interest/entities/interest.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'enum', enum: AppRoles, default: AppRoles.USER })
  roles: AppRoles;

  @Column({ nullable: true })
  profileId: number;

  @OneToOne(type => Profile)
  @JoinColumn()
  public profile: Profile;

  @OneToMany(() => Interest, (interest: Interest) => interest.user)
  public interests: Interest[];
}
