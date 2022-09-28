import { Pet } from '../pet/entities/pet.entity';
import { Session } from '../typeorm/entities/Session';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { Interest } from '../interest/entities/interest.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seed';
import 'dotenv/config';
import 'reflect-metadata';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.PG_DB_HOST,
  port: Number.parseInt(process.env.PG_DB_PORT),
  username: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASS,
  database: process.env.PG_DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Profile, Session, Pet, Interest],
  migrations: [`${__dirname}/migrations/*`],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
