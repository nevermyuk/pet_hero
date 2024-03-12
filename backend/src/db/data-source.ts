import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Interest } from '../interest/entities/interest.entity';
import { Pet } from '../pet/entities/pet.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Session } from '../typeorm/entities/Session';
import { User } from '../users/entities/user.entity';
import { MainSeeder } from './seeds/main.seed';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Profile, Session, Pet, Interest],
  migrations: [`${__dirname}/migrations/*`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
